const mongoose = require('mongoose')
const { Card } = require('../models/Card')
const {CardSet} = require("../models/CardSet")
mongoose.connect('mongodb://localhost/pokemonDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pokemonSeed = [
    {
        name: "Umbreon",
        elementType: "Psychic",
        suffix: 'VMax',
        cardType: 'Pokemon',
        artist: "Keiichiro Ito",
        price: 475.17,
        cardNumber: 215,
        cardSet:  "63e146e6462af39290c3a37c"
    },

   
]


const seedPokemon = async () => await Card.insertMany(pokemonSeed)
 
module.exports = {seedPokemon}