const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const { default: slugify } = require("slugify");
const CardSet = require("../models/CardSet");
const Card = require("../models/Card");
const User = require("../models/User");
const BASE_URL = "https://www.pricecharting.com/game/pokemon-";

module.exports = {
  createCard: async ({ body }, res) => {
    try {
      let newCardId;
      let { name, prefix, suffix, cardNumber, cardSet, artist, cardType } =
        body.data;

      let cardSetSlug = slugify(cardSet).toLowerCase();
      let slugArray = [];

      for (const cardProperty in body.data) {
        if (
          body.data[cardProperty] &&
          cardProperty != "cardSet" &&
          cardProperty != "artist" &&
          cardProperty != "cardType" &&
          cardProperty != "userId" &&
          cardProperty != "elementalType"
        ) {
          slugArray.push(body.data[cardProperty]);
        }
      }
      let slugifiedString = slugify(slugArray.join(" ").toLowerCase());
      console.log(`${BASE_URL}${cardSetSlug}/${slugifiedString}`);
      let response = await axios.get(
        `${BASE_URL}${cardSetSlug}/${slugifiedString}`
      );

      let data = response?.data;

      const $ = cheerio.load(data);
      //Using the slice method to remove the $ from the returned value for the price
      let price = parseFloat(
        $('td[id="used_price"] > span[class="price js-price"]')
          .text()
          .trim()
          .slice(1)
      );
      let picture = $('div[class="cover"] > img').attr("src");

      if (!!price && !!picture) {
        let { _id } = await CardSet.findOne({ name: cardSet });

        let { _id: cardId } = await Card.create({
          name,
          suffix,
          prefix,
          cardNumber,
          cardSet: _id,
          price,
          picture,
          artist,
          cardType,
        });
        newCardId = cardId;

        res.send({ newCardId }).status(200);
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

      let allResults = { ...results, fullName: results.fullName };
      res.send(allResults).status(200);
    } catch (e) {
      res.send(e).status(500);
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
      res.send(e).status(500);
    }
  },
};
