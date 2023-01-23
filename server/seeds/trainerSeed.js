const mongoose = require('mongoose')
const {Trainer} = require('../models/')

mongoose.connect('mongodb://localhost/pokemonDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trainerSeed = [ 
    {
        name: 'Cheryl',
        type: 'Supporter',
        cardNumber: 159,
        Description: "Heal all damage from each of your Evolution Pokemon. If you do, discard all Energy from the Pokemon that were healed tis way.",
        artist: "Yuu Nishida",
        cardSet: "61ac93eb0488fae3d0d5e72e",
        quantity: 1
    },

    {
        name: 'Mallow & Lana',
        type: 'Supporter',
        cardNumber: 259,
        Description: "Draw 2 cards. If you go second and it's your first turn, draw 3 more cards.",
        artist: "kirisAki",
        cardSet: "61ac93eb0488fae3d0d5e729",
        quantity: 1
    },

    {
        name: 'Dancer',
        type: 'Supporter',
        cardNumber: 231,
        Description: "Switch your Active Pokemon with 1 of your Benched Pokemon. When you play this card, you may discard 2 other cards from your hand. If you do, heal 120 damage from the Pokemon you moved to your Bench",
        artist: "Yuu Nishida",
        cardSet: "61ac93eb0488fae3d0d5e729",
        quantity: 1
    },


]

const seedTrainer = () => Trainer.collection.insertMany(trainerSeed)


module.exports = seedTrainer