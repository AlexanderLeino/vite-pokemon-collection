const seedPokemon= require('./pokemonSeed')
const seedCardSet = require('./cardSetSeed')
const seedTrainer = require('./trainerSeed')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pokemonDb',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}, async function(){
  await mongoose.connection.dropDatabase();
  seedAll()
});


const seedAll = async () => {
  try{
      
      await seedCardSet();
      console.log('\n----- CardSets Inserted Into Database -----\n');

      await seedPokemon();
      console.log('\n----- Pokemon Inserted Into Database -----\n');
  
      await seedTrainer();
      console.log('\n----- Trainers Inserted Into Database -----\n');
     
      process.exit(0);
  } catch (e) {
    console.log(e)
  }  
  };