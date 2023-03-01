const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const { default: slugify } = require("slugify");
const {CardSet} = require("../models/CardSet");
const {Card} = require("../models/Card");
const BASE_URL = "https://www.pricecharting.com/game/pokemon-";

module.exports = {
  createCard: async ({ body }, res) => {
    try {
      let serializedCardNumber 
      let { name, prefix, suffix, cardNumber, cardSet, artist, cardType, tags, elementType } =
        body.data;
      let upperCasedSuffix = suffix.toUpperCase()
      let upperCasedPrefix = prefix.toUpperCase()
      if(cardNumber[0] === "0") {
        serializedCardNumber = cardNumber.split("").slice(1).join("")
       
      } else {
        serializedCardNumber = cardNumber
      }
      let cardSetSlug = slugify(cardSet).toLowerCase();
      let slugArray = [];

      for (const cardProperty in body.data) {
        if (
          body.data[cardProperty] &&
          cardProperty != "cardSet" &&
          cardProperty != "artist" &&
          cardProperty != "cardType" &&
          cardProperty != "userId" &&
          cardProperty != "elementType" &&
          cardProperty != 'tags'
        ) {
          if(cardProperty === 'cardNumber'){
            slugArray.push(serializedCardNumber)
          } else {
            slugArray.push(body.data[cardProperty]);
          }
        }
      }
      let slugifiedString = slugify(slugArray.join(" ").toLowerCase());
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
      let picture = $('div[class="cover"] > img').attr("src")

      if (!!price && !!picture) {
        console.log("NAME", name, "serialized Card Number", serializedCardNumber)
        let cardData = await Card.findOne({name, cardNumber: serializedCardNumber})
        console.log("CARD DATA", cardData)
        if (cardData) {
          console.log("WE FOUND THE SAME CARD LOL", cardData)
          let response = {cardData, message: "The Card Already Exists in the Database but here you go"}
          res.send(response).status(200);
        } else {
          let { _id, year } = await CardSet.findOne({ name: cardSet });
          let allTags = [...tags, year]
          let results = await Card.create({
            name,
            suffix:upperCasedSuffix,
            prefix: upperCasedPrefix,
            cardNumber: serializedCardNumber,
            cardSet: _id,
            price,
            picture,
            artist,
            cardType,
            tags: allTags,
            elementType
          });
          res.send(results).status(200);
        }
      } else {
        throw new Error(
          "Coulnd't find the price for the card you were looking for!"
        );
      }
    } catch (e) {
      res.status(500).send({
        message: e.message,
      });
    }
  },
  findCard: async ({ body }, res) => {
    try {
      let { name, cardNumber } = body.data;
      let results = await Card.findOne({ name, cardNumber });
      let fullName = results.fullName
      let obj = results._doc
      obj.fullName = fullName
      res.status(200).send(obj);
    } catch (e) {
      res.status(500).send({message: e.message})
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
      res.send({message: error.message}).status(500);
    }
  },
};
