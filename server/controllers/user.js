const axios = require("axios");
const bycrpt = require("bcrypt");
const {signToken} = require('../utlis') 
require("dotenv").config();
const User = require("../models/User.js");

module.exports = {
  signIn: async ({ body }, res) => {
    let token
    try {
      let { userName, password } = body
      let response = await User.findOne({ userName });
      
      const match = await bycrpt.compare(password, response.password);
      if(match) {
        token = signToken(response)
      }
      res.send({token}).status(200)
    } catch (e) {
      res.send({message: e.message}).status(400);
    }
  },
  createUser: async ({ body }, res) => {
    try {
        let {userName, password, email} = body
        let response = await User.create({ userName, password, email });
        let token = signToken(response)
        res.send(token).status(200);
    } catch (e) {
      res.send({message: e.message}).status(400);
    }

  },
  updateCardList: async ({body}, res) => {
    try {
        let {cardData, userId} = body.data
        
      
        let foundUser = await User.findOne({_id: userId}).elemMatch('cards', {name: cardData.name, cardNumber: cardData.cardNumber})
        console.log('Found User', foundUser)
        if(foundUser){ 
          // await User.updateOne({})
        } else {
          await User.updateOne({_id: userId}, {
            $push: {
                cards: cardData
            }
        })
        }


      
      res.send({message: "User was successfully updated! :)"}).status(200)
    } catch (e) {
      res.send({message: e.message}).status(500)
    }
  },
  findCardSubDoc: async ({body} , res) => {
    
    let foundDocument = User.findOne({_id: body.data}).elemMatch('cards', {name: "Umbreon", cardNumber: "215"}).select("cards.$").exec(async function(err, doc){
      doc.cards[0].quantity = doc.cards[0].quantity + 1
      let updatedUser = await User.findOneAndUpdate({_id: body.data}, {
          cards: doc.cards[0]
      
      })

      console.log("Updated User", updatedUser)
    })


    
    
  }
  
};
