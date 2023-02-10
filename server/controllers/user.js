const bycrpt = require("bcrypt");
const { signToken } = require("../utlis");
require("dotenv").config();
const User = require("../models/User.js");

module.exports = {
  signIn: async ({ body }, res) => {
    let token;
    try {
      let { userName, password } = body;
      let response = await User.findOne({ userName });

      const match = await bycrpt.compare(password, response.password);
      if (match) {
        token = signToken(response);
      }
      res.send({ token }).status(200);
    } catch (e) {
      res.send({ message: e.message }).status(400);
    }
  },
  createUser: async ({ body }, res) => {
    try {
      let { userName, password, email } = body;
      let response = await User.create({ userName, password, email });
      let token = signToken(response);
      res.send(token).status(200);
    } catch (e) {
      res.send({ message: e.message }).status(400);
    }
  },
  updateCardList: async ({ body }, res) => {
    try {
      let { cardData, userId, quantityValue } = body.data;
      User.findOne({ _id: userId })
        .elemMatch("cards", {
          name: cardData.cardName,
          cardNumber: cardData.cardNumber,
        })
        .select("cards.$")
        .exec(async function (err, doc) {
          if (doc) {
            doc.cards[0].quantity = quantityValue;
            console.log("DOC DOC", doc)
            let { cards } = await User.findOne({ _id: userId });

            let cardIndexToBeUpdated = cards.findIndex(
              (card) =>
                card.name === cardData.cardName &&
                card.cardNumber === cardData.cardNumber
            );

            let updatedList = cards;
            updatedList[cardIndexToBeUpdated] = doc.cards[0];
            await User.findOneAndUpdate(
              { _id: userId },
              {
                cards: updatedList,
              }
            );
          } else {
            await User.findOneAndUpdate(
              { _id: userId },
              {
                $push: {
                  cards: cardData,
                },
              }
            );
          }
        });
      res.send({ message: "User was successfully updated! :)" }).status(200);
    } catch (e) {
      res.send({ message: e.message }).status(500);
    }
  },
  userCollection: async ({ body }, res) => {
    try {
      let { data: userId } = body;
      let results = await User.findOne({ _id: userId }).select('cards')

      res.status(200).send({cardCollection: results.cards, portfolioValue: results.portfolio});
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  updateUserCard: async ({body}, res) => {
    
  }
};
