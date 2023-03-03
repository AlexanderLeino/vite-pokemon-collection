const mongoose = require('mongoose')
const {CardSet} = require('../models/CardSet')

mongoose.connect('mongodb://localhost/pokemonDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CardSetSeed = [
    {
        name: "Base Set",
        year: 1999,
        totalNumberOfCardsInSet: 102
    },

    {
        name: "Jungle",
        year: 1999,
        totalNumberOfCardsInSet: 102
    },

    {
        name: "Fossil",
        year: 1999,
        totalNumberOfCardsInSet: 62
    },

    {
        name: "Base Set 2",
        year: 2000,
        totalNumberOfCardsInSet: 130
    },

    {
        name: "Team Rocket",
        year: 2000,
        totalNumberOfCardsInSet: 83
    },

    {
        name: "Gym Heros",
        year: 2000,
        totalNumberOfCardsInSet: 132
    },

    {
        name: "Gym Challenge",
        year: 2000,
        totalNumberOfCardsInSet: 132
    },

    {
        name: "Neo Genesis",
        year: 2000,
        totalNumberOfCardsInSet: 111
    },

    {
        name: "Neo Discovery",
        year: 2001,
        totalNumberOfCardsInSet: 75
    },

    {
        name: "Neo Revelation",
        year: 2001,
        totalNumberOfCardsInSet: 83
    },

    {
        name: "Neo Destiny",
        year: 2002,
        totalNumberOfCardsInSet: 113
    },

    {
        name: "Legendary Collection",
        year: 2002,
        totalNumberOfCardsInSet: 110
    },

    {
        name: "Expedition Base Set",
        year: 2002,
        totalNumberOfCardsInSet: 165
    },

    {
        name: "Aquapolis",
        year: 2003,
        totalNumberOfCardsInSet: 186
    },

    {
        name: "Skyridge",
        year: 2003,
        totalNumberOfCardsInSet: 182
    },
    
    {
        name: "EX Ruby & Sapphire",
        year: 2003,
        totalNumberOfCardsInSet: 109
    },

    {
        name: "EX Sandstorm",
        year: 2003,
        totalNumberOfCardsInSet: 100
    },

    {
        name: "EX Dragon",
        year: 2003,
        totalNumberOfCardsInSet: 100
    },

    {
        name: "EX Team Magma vs Team Aqua",
        year: 2004,
        totalNumberOfCardsInSet: 97
    },

    {
        name: "EX Hidden Legends",
        year: 2004,
        totalNumberOfCardsInSet: 102
    },

    {
        name: "EX FireRed & LeafGreen",
        year: 2004,
        totalNumberOfCardsInSet: 116
    },

    {
        name: "EX Team Rocket Returns",
        year: 2004,
        totalNumberOfCardsInSet: 111
    },

    {
        name: "EX Deoxys",
        year: 2005,
        totalNumberOfCardsInSet: 108
    },

    {
        name: "EX Emerald",
        year: 2005,
        totalNumberOfCardsInSet: 107
    },

    {
        name: "EX Unseen Forces",
        year: 2005,
        totalNumberOfCardsInSet: 145
    },

    {
        name: "EX Delta Species",
        year: 2005,
        totalNumberOfCardsInSet: 114
    },

    {
        name: "EX Legend Maker",
        year: 2005,
        totalNumberOfCardsInSet: 145
    },

    {
        name: "EX Holon Phantoms",
        year: 2006,
        totalNumberOfCardsInSet: 145
    },

    {
        name: "EX Crystal Guardians",
        year: 2005,
        totalNumberOfCardsInSet: 100
    },

    {
        name: "EX Dragon Frontiers",
        year: 2006,
        totalNumberOfCardsInSet: 101
    },

    {
        name: "EX Power Keepers",
        year: 2007,
        totalNumberOfCardsInSet: 108
    },

    {
        name: "Diamond & Pearl",
        year: 2007,
        totalNumberOfCardsInSet: 130
    },

    {
        name: "Mysterious Treasures",
        year: 2007,
        totalNumberOfCardsInSet: 124
    },

    {
        name: "Secret Wonders",
        year: 2007,
        totalNumberOfCardsInSet: 132
    },

    {
        name: "Great Encounters",
        year: 2008,
        totalNumberOfCardsInSet: 106
    },
    
    {
        name: "Majestic Dawn",
        year: 2008,
        totalNumberOfCardsInSet: 100
    },

    {
        name: "Legends Awakened",
        year: 2008,
        totalNumberOfCardsInSet: 146
    },

    {
        name: "Stormfront",
        year: 2008,
        totalNumberOfCardsInSet: 106
    },

    {
        name: "Platinum",
        year: 2009,
        totalNumberOfCardsInSet: 133
    },

    {
        name: "Rising Rivals",
        year: 2009,
        totalNumberOfCardsInSet: 120
    },

    {
        name: "Supreme Victors",
        year: 2009,
        totalNumberOfCardsInSet: 153
    },

    {
        name: "Arceus",
        year: 2009,
        totalNumberOfCardsInSet: 111
    },

    {
        name: "HeartGold & Soulsilver",
        year: 2010,
        totalNumberOfCardsInSet: 124
    },

    {
        name: "Unleashed",
        year: 2010,
        totalNumberOfCardsInSet: 96
    },

    {
        name: "Unduanted",
        year: 2010,
        totalNumberOfCardsInSet: 91
    },

    {
        name: "Triumphant",
        year: 2010,
        totalNumberOfCardsInSet: 103
    },

    {
        name: "Call of Legends",
        year: 2011,
        totalNumberOfCardsInSet: 106
    },

    {
        name: "Black & White",
        year: 2011,
        totalNumberOfCardsInSet: 115
    },

    {
        name: "Emerging Powers",
        year: 2011,
        totalNumberOfCardsInSet: 98
    },

    {
        name: "Noble Victories",
        year: 2011,
        totalNumberOfCardsInSet: 102
    },

    {
        name: "Next Destinies",
        year: 2012,
        totalNumberOfCardsInSet: 103
    },

    {
        name: "Dark Explorers",
        year: 2012,
        totalNumberOfCardsInSet: 111
    },

    {
        name: "Dragons Exalted",
        year: 2012,
        totalNumberOfCardsInSet: 128
    },

    {
        name: "Boundaries Crossed",
        year: 2012,
        totalNumberOfCardsInSet: 153
    },

    {
        name: "Plasma Storm",
        year: 2013,
        totalNumberOfCardsInSet: 138
    },
    
    {
        name: "Plasma Freeze",
        year: 2013,
        totalNumberOfCardsInSet: 122
    },

    {
        name: "Plasma Blast",
        year: 2013,
        totalNumberOfCardsInSet: 105
    },

    {
        name: "Legendary Treasures",
        year: 2013,
        totalNumberOfCardsInSet: 140
    },

    {
        name: "XY",
        year: 2014,
        totalNumberOfCardsInSet: 146
    },

    {
        name: "Flashfire",
        year: 2014,
        totalNumberOfCardsInSet: 109
    },

    {
        name: "Furious Fists",
        year: 2014,
        totalNumberOfCardsInSet: 113
    },

    {
        name: "Phantom Forces",
        year: 2014,
        totalNumberOfCardsInSet: 122
    },

    {
        name: "Primal Clash",
        year: 2015,
        totalNumberOfCardsInSet: 164
    },

    {
        name: "Roaring Skies",
        year: 2015,
        totalNumberOfCardsInSet: 110
    },

    {
        name: "Ancient Origins",
        year: 2015,
        totalNumberOfCardsInSet: 100
    },

    {
        name: "BREAKthrough",
        year: 2015,
        totalNumberOfCardsInSet: 164
    },

    {
        name: "BREAKpoint",
        year: 2016,
        totalNumberOfCardsInSet: 123
    },

    {
        name: "Fates Collide",
        year: 2016,
        totalNumberOfCardsInSet: 125
    },

    {
        name: "Steam Siege",
        year: 2016,
        totalNumberOfCardsInSet: 116
    },

    {
        name: "Evolutions",
        year: 2016,
        totalNumberOfCardsInSet: 113
    },

    {
        name: "Sun & Moon",
        year: 2017,
        totalNumberOfCardsInSet: 163
    },

    {
        name: "Guardians Rising",
        year: 2017,
        totalNumberOfCardsInSet: 169
    },

    {
        name: "Burning Shadows",
        year: 2017,
        totalNumberOfCardsInSet: 169
    },

    {
        name: "Crimson Invasion",
        year: 2017,
        totalNumberOfCardsInSet: 124
    },

    {
        name: "Ultra Prism",
        year: 2003,
        totalNumberOfCardsInSet: 182
    },
    
    {
        name: "Forbidden Light",
        year: 2018,
        totalNumberOfCardsInSet: 146
    },

    {
        name: "Celestial Storm",
        year: 2018,
        totalNumberOfCardsInSet: 2018
    },

    {
        name: "Lost Thunder",
        year: 2018,
        totalNumberOfCardsInSet: 236
    },

    {
        name: "Team Up",
        year: 2019,
        totalNumberOfCardsInSet: 196
    },

    {
        name: "Unbroken Bounds",
        year: 2019,
        totalNumberOfCardsInSet: 234
    },

    {
        name: "Unified Minds",
        year: 2019,
        totalNumberOfCardsInSet: 258
    },

    {
        name: "Cosmic Eclipse",
        year: 2019,
        totalNumberOfCardsInSet: 271
    },

    {
        name: "Sword & Shield",
        year: 2020,
        totalNumberOfCardsInSet: 216
    },

    {
        name: "Rebel Clash",
        year: 2020,
        totalNumberOfCardsInSet: 209
    },

    {
        name: "Darkness Ablaze",
        year: 2020,
        totalNumberOfCardsInSet: 201
    },

    {
        name: "Vivid Voltage",
        year: 2020,
        totalNumberOfCardsInSet: 203
    },

    {
        name: "Battle Styles",
        year: 2021,
        totalNumberOfCardsInSet: 183
    },

    {
        name: "Chilling Reign",
        year: 2021,
        totalNumberOfCardsInSet: 233
    },

    {
        name: "Evolving Skies",
        year: 2021,
        totalNumberOfCardsInSet: 237
    },

    {
        name: "Fusion Strike",
        year: 2021,
        totalNumberOfCardsInSet: 284
    },
    {
        name: 'Celebrations', 
        year: 2021,
        totalNumberOfCardsInSet: 50
    },
    {
        name: 'Brilliant Stars',
        year: 2022,
        totalNumberOfCardsInSet: 186
    },
    {
        name: 'Astral Radiance',
        year: 2022,
        totalNumberOfCardsInSet: 246
    },
    {
        name: 'Pokemon GO',
        year: 2022,
        totalNumberOfCardsInSet: 88
    }, 
    {
        name: "Lost Origin",
        year: 2022,
        totalNumberOfCardsInSet: 247
    }, 
    {
        name: 'Silver Tempest', 
        year: 2022,
        totalNumberOfCardsInSet: 245
    },
    {
        name: 'Crown Zenith',
        year: 2023,
        totalNumberOfCardsInSet: 230
    }, 
    {
        name: 'Scarlet & Violet',
        year: 2023,
        totalNumberOfCardsInSet: 195
    },
    {
        name: "Promo",
    },
    {
        name: "Shining Fates",
        year: 2021,
        totalNumberOfCardsInSet: 122
    }


]

const seedCardSet = async () => await CardSet.insertMany(CardSetSeed)
  
module.exports = {seedCardSet, CardSetSeed}