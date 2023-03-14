const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const  slugify  = require("slugify");
const { CardSet } = require("../models/CardSet");
const { Card } = require("../models/Card");
const BASE_URL = "https://www.pricecharting.com/game/pokemon-";
module.exports = {
  createCard: async ({ body }, res) => {
    try {
      let serializedCardNumber;
      let {
        name,
        prefix,
        suffix,
        cardNumber,
        cardSet,
        artist,
        cardType,
        tags,
        year: enteredPromoYear,
        elementType,
      } = body.data;
     
      let upperCasedSuffix = suffix.toUpperCase();
      let serializedPrefix = ''
      if(prefix){
        let arrayedPrefix = prefix.split(' ')
        let resultsArray = []

        arrayedPrefix.forEach((word) => {
          let firstLetter = word[0].toUpperCase()
            let restOfWord = word.slice(1).toLowerCase()

            let newWord = `${firstLetter}${restOfWord}`
            resultsArray.push(newWord)
            serializedPrefix = resultsArray.join(' ')
        })

      }
      if (cardNumber[0] === "0" && cardNumber[1] === "0") {
        serializedCardNumber = cardNumber.split("").slice(2).join("");
      } else if(cardNumber[0] === "0") {
        serializedCardNumber = cardNumber.split("").slice(1).join("");
      }
      else {
        serializedCardNumber = cardNumber;
      }
      let cardSetSlug = slugify(cardSet).toLowerCase();

      if(cardSetSlug.includes("pokemon")){
          cardSetSlug = cardSetSlug.split('-').slice(1).join('')
      }
      let slugArray = [];

      for (const cardProperty in body.data) {
        if (
          body.data[cardProperty] &&
          cardProperty != "cardSet" &&
          cardProperty != "artist" &&
          cardProperty != "cardType" &&
          cardProperty != "userId" &&
          cardProperty != "elementType" &&
          cardProperty != "tags" &&
          cardProperty != "trainerType" &&
          cardProperty != "year"
        ) {
          if (cardProperty === "cardNumber") {
            slugArray.push(serializedCardNumber);
          } else {
            slugArray.push(body.data[cardProperty]);
          }
        }
      }
      let slugifiedString  
      if(name.includes("&")) {
        let nameSlug = name.trim().split(' ').join("-").toLowerCase()
        if(prefix && suffix){
          slugifiedString = `${prefix} ${nameSlug} ${suffix} ${cardNumber}`.replace(' ', '-').toLowerCase()
        } else if (prefix) {
          slugifiedString = `${prefix} ${nameSlug} ${cardNumber}`.replace(' ', '-').toLowerCase()
        } else if (suffix) {
          console.log("MAKING IT TO SUFFIX")
          slugifiedString = `${nameSlug} ${suffix}-${cardNumber}`.trim().replace(' ', '-').toLowerCase()
        } 
      } else {
        slugifiedString = slugify(slugArray.join(" ").toLowerCase());
      }
      console.log(`${BASE_URL}${cardSetSlug}/${slugifiedString}`);
      let response = await axios.get(
        `${BASE_URL}${cardSetSlug}/${slugifiedString}`
      );

      let data = response?.data;

      const $ = cheerio.load(data);

      let price = parseFloat(
        $('td[id="used_price"] > span[class="price js-price"]')
          .text()
          .trim()
          .slice(1)
      );
     
      let picture = $('div[class="cover"] > img').attr("src");
        
      if (!!price && !!picture) {
        let cardData = await Card.findOne({
          name,
          cardNumber: serializedCardNumber,
        });

        if (cardData) {
          let response = {
            card: cardData,
            message: "This card already exists in the database!",
          };
          res.send(response).status(200);
        } else {
          let { _id, year } = await CardSet.findOne({ name: cardSet });
          let allTags = []
          if(cardSet === "Promo"){
            allTags = [...tags, serializedPrefix, enteredPromoYear];
          } else {
            allTags = [...tags, serializedPrefix, year];
          }
         
          let results = await Card.create({
            name,
            suffix: upperCasedSuffix,
            prefix: serializedPrefix,
            cardNumber: serializedCardNumber,
            cardSet: _id,
            price,
            picture,
            artist,
            cardType,
            tags: allTags,
            elementType,
          });
          
          res.send({message: "Thanks to your contribution this card is now apart of our database! Also its been added to your profile!",card: results}).status(200);
        }
      } else {
        throw new Error(
          "Coulnd't find the price for the card you were looking for!"
        );
      }
    } catch (e) {
      console.log("ERROR MESSAGe", e)
      res.send({
        message: "Couldn't find the price for the card you were looking for!",
      }).status(500);
    }
  },
  findCard: async ({ body }, res) => {
    try {
      let { name, cardNumber } = body.data;
      let results = await Card.findOne({ name, cardNumber });
      let fullName = results.fullName;
      let obj = results._doc;
      obj.fullName = fullName;
      res.status(200).send(obj);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  cardExistInDb: async ({ body }, res) => {
    try {
      let response;
      let { name, cardNumber } = body.data;
      let results = await Card.findOne({ name, cardNumber });
      if (results) {
        response = true;
      } else {
        response = false;
      }
      res.send(response).status(200);
    } catch (e) {
      res.send({ message: error.message }).status(500);
    }
  },
};
