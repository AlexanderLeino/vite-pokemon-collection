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
          name: cardData.name,
          cardNumber: cardData.cardNumber,
        })
        .select("cards.$")
        .exec(async function (err, doc) {
          if (doc) {
            if(quantityValue === undefined) {
              doc.cards[0].quantity = doc.cards[0].quantity + 1
            }
            else {
              doc.cards[0].quantity = quantityValue;
            }
          
            let { cards } = await User.findOne({ _id: userId });

            let cardIndexToBeUpdated = cards.findIndex(
              (card) =>
                card.name === cardData.name &&
                card.cardNumber === cardData.cardNumber
            );

            let updatedList = cards;
            updatedList[cardIndexToBeUpdated] = doc.cards[0];
            console.log("updated LIST", updatedList)
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
      let tagArray = []

     results.cards.forEach((card) => {
        
        card.tags.forEach((tag) => {
          tagArray.push(tag)
        })
      })  
      let uniqueTagArray = [...new Set(tagArray)]
      let tagsArray = uniqueTagArray.map((tag) => {
       
        return {value: tag, label: tag}
      })
   
      res.status(200).send({cardCollection: results.cards, portfolioValue: results.portfolio, tags: tagsArray});
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  updateUserCard: async ({body}, res) => {
    
  },
  deleteCard: async ({body}, res) => {
    try{
      let {userId, cardData:{cardName, cardNumber}} = body.data
      User.findOne({ _id: userId })
        .elemMatch("cards", {
          name: cardName,
          cardNumber: cardNumber
        })
        .select("cards.$")
        .exec(async function (err, doc) {
          await User.findOneAndUpdate({_id: userId}, {
            $pull: {
             cards: {
               _id: doc.cards[0]._id
             }
            }
          })
          res.send({message: "User Has Been Updated Successfully"}).status(200)
        })
    } catch (e) {
      res.send({message: e.message}).status(500)
    }
      
    }
};
