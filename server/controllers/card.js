const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const slugify = require("slugify");
const { CardSet } = require("../models/CardSet");
const { Card } = require("../models/Card");
const { error } = require("console");
const BASE_URL = "https://www.pricecharting.com/game/pokemon-";
module.exports = {
  createCard: async ({ body }, res) => {
    try {
     
      let {
        name,
        prefix,
        suffix,
        cardStyle,
        cardNumber,
        cardSet,
        artist,
        cardType,
        tags,
        year: enteredPromoYear,
        elementType,
      } = body.data
      console.log("CARDSET", cardSet)
      let price 
      let picture
      let cardSetSlug
     
      let fallbackSlugifiedString
      let upperCasedSuffix = suffix.toUpperCase();
      let serializedPrefix = "";
      let slugArray
      let result
      if (prefix) {
        let arrayedPrefix = prefix.split(" ");
        let resultsArray = [];

        arrayedPrefix.forEach((word) => {
          let firstLetter = word[0].toUpperCase();
          let restOfWord = word.slice(1).toLowerCase();

          let newWord = `${firstLetter}${restOfWord}`;
          resultsArray.push(newWord);
          serializedPrefix = resultsArray.join(" ");
        });
      }
        cardSetSlug = slugify(cardSet).toLowerCase();

        if (cardSet.includes("&")) {
          let newString = cardSet.replace(/ /g, "-").toLowerCase();
          cardSetSlug = newString;
        }

        if (cardSet.includes("Pokemon")) {
          cardSetSlug = cardSetSlug.split("-").slice(1).join("").toLowerCase();
        }

        slugArray = ["", "", "", "", ""];

        for (const cardProperty in body.data) {
          switch (cardProperty) {
            case "name":
              if (name.includes("&")) {
                let nameSlug = name.trim().split(" ").join("-").toLowerCase();
                slugArray[1] = nameSlug;
              } else {
                slugArray[1] = name;
              }
              break;
            case "prefix":
              slugArray[0] = prefix;
              break;
            case "suffix":
              slugArray[2] = suffix;
              break;
            case "cardStyle":
              if (cardStyle === "Reverse Holo" || cardStyle === "Holo") {
                slugArray[4] = cardStyle;
              }
              break;
            case "cardNumber":
              slugArray[5] = cardNumber;
              break;
          }
        }
        let slugifiedString = slugify(slugArray.join(" ").toLowerCase());
        //if A price and picture cant be found with original criteria then it will remove either word holo or reverse holo and try again
        let valueToRemove = slugArray.splice(4, 1);
        let array = [...slugArray, valueToRemove];
        fallbackSlugifiedString = slugify(
          slugArray.join(" ").toLowerCase()
        );
        
        console.log(`${BASE_URL}${cardSetSlug}/${slugifiedString}`);
        let response = await axios.get(
          `${BASE_URL}${cardSetSlug}/${slugifiedString}`
        );

        let data = response?.data;

        let $ = cheerio.load(data);

        price = parseFloat(data.price1
        .slice(1))
        

        picture = data.imageUri
        console.log("BEFORE", price, picture);
      

      if (!price && !picture) {
        console.log(
          "Couldnt find on First Go Around",
          `${BASE_URL}${cardSetSlug}/${fallbackSlugifiedString}`
        );
        response = await axios.get(
          `${BASE_URL}${cardSetSlug}/${fallbackSlugifiedString}`
        );
        data = response?.data;
        console.log("DATA", data.price1, data.imageUri)
        $ = cheerio.load(data);

        price = parseFloat(data.price1
          .slice(1))
        

        picture = data.imageUri
        ///need to verify the obj id for cardSet
      } if (!!price && !!picture) {
        console.log("Made it to the final stage")
        let { _id, year } = await CardSet.findOne({ name: cardSet });
        let allTags = [];

        if (cardSet === "Promo") {
          allTags = [
            ...tags,
            serializedPrefix,
            artist,
            enteredPromoYear,
            cardStyle,
          ];
        } else {
          allTags = [...tags, serializedPrefix, artist, year, cardStyle];
        }
        if (name.includes("&")) {
          let names = name.split("&");
          let trimmedNames = names.map((name) => name.trim());
          allTags = [...allTags, trimmedNames].flat();
        }
       
        let response = await Card.create({
          name,
          suffix: upperCasedSuffix,
          prefix: serializedPrefix,
          cardNumber,
          cardSet: _id,
          price,
          picture,
          artist,
          cardType,
          tags: allTags,
          elementType,
          cardStyle,
        });
        result = { message:
          "Thanks to your contribution this card is now apart of our database! Also its been added to your profile!",
          card: response,}
        res
          .send(result)
          .status(200);
      } else {
        throw Error(
          "Couldnt find card in database or based on the information provided."
        );
      }
    } catch (e) {
      console.log("Error", e);
      res
        .send({
          message: "Couldn't find the price for the card you were looking for!",
        })
        .status(500);
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
      let result
      let { name, cardNumber, cardSet } = body.data;
     
     console.log("CARD SET", cardSet)
      let {_id} = await CardSet.findOne({name: cardSet})
      let response = await Card.findOne({ name, cardNumber, cardSet: _id });
      console.log("RESULTS OF DB CHECK", response)
      if (response) {
        result = {existInDb: true, card: response, message: "The Card Already Exists In Database!"}
      } else {
        result = {existInDb: false, card: response, message: "The Card Doesnt Currently Exists In DB"};
      }
      res.send(result).status(200);
    } catch (e) {
      res.send({ message: error.message }).status(500);
    }
  },
};
