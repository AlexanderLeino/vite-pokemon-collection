const axios = require("axios");
const bycrpt = require("bcrypt");
const {signToken} = require('../utlis') 
require("dotenv").config();
const User = require("../models/User.js");

module.exports = {
  signIn: async ({ body }, res) => {
    console.log('Trying to sign in', body)
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
      res.send(e).status(400);
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
        let {userId, cardId:{newCardId}} = body.data
        await User.updateOne({_id: userId}, {
          $push: {
              cards: newCardId
          }
      })
      res.send({message: "User was successfully updated! :)"}).status(200)
    } catch (e) {
      res.send(e).status(500)
    }
  }
  
};
