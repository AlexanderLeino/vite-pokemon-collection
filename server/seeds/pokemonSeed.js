const mongoose = require('mongoose')
const {Card, CardSet} = require('../models/')

mongoose.connect('mongodb://localhost/pokemonDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pokemonSeed = [
    {
        name: "Rockruff",
        type: "fighting",
        move1: "crunch",
        damage1: "30",
        move1Description: "Flip a coin. If heads, discard an energy from your opponent's active pokemon",
        artist: "Yuu Nishida",
        cardType: "None of the Above",
        cardNumber: 86
    },

    {
        name: "Diglett",
        type: "fighting",
        move1: "dig",
        damage1: "10",
        move1Description: "Flip a coin. If heads, during your opponents next turn preventa all damage from and effects of attacks done to this pokemon.",
        artist: "Souichiriou Gunjima",
        cardType: "Reverse Holo",
        cardNumber: 76
    },

    {
      name: "Entei",
      type: "fire",
      move1: "Angry Fang",
      damage1: "10x",
      move1Description: "This attack does 10 damage for each damage counter on all of your Benched Single Strike Pokemon",
      move2: "Heat Tackle",
      damage2: 120,
      move2Description: "This Pokemon also does 30 damage to itself",
      artist: "NC Empire",
      cardType: "None of the Above",
      cardNumber: 86
  },

]

const seedPokemon = async () =>{
  const cardSet = await CardSet.findOne({})
  let pokemonSeedsWCardSet = pokemonSeed.map( pokemon=> {
    pokemon.originalCardSet = [cardSet._id]
    return pokemon
  })
  await Card.collection.insertMany(pokemonSeedsWCardSet)
} 
 
module.exports = seedPokemon