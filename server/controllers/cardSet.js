const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
const slug = require('slug')
const {CardSet} = require('../models')
let baseURL ="https://www.pricecharting.com/game/pokemon-"
module.exports = {
    getAllCardSets: async (req, res) => {
        
        let sets = await CardSet.find({})
        res.json(sets).status(200)
    },
    getCardSetSlug: async (req, res) => {
        
    }
}