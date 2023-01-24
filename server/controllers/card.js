const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
const { default: slugify } = require('slugify')
const CardSet = require('../models/CardSet')
const Card = require('../models/Card')
let baseURL ="https://www.pricecharting.com/game/pokemon-"

module.exports = {
    findCard: async ({body}, res) => {
        try {

            let { name, prefix, suffix, cardNumber, cardSet } = body.data
            console.log('WO', name, suffix, cardNumber, cardSet)
            let cardSetSlug = slugify(cardSet).toLowerCase()
            let slugArray = []
            
            for (const cardProperty in body.data){
                if(body.data[cardProperty] && cardProperty != 'cardSet'){
                    slugArray.push(body.data[cardProperty])
                }
                
            }
            let slugifiedString = slugify(slugArray.join(" ").toLowerCase())
            let response = await axios.get(`${baseURL}${cardSetSlug}/${slugifiedString}`)

            let data = response?.data

            const $ = cheerio.load(data)
            //Using the slice method to remove the $ from the returned value for the price
            let price = parseInt($('td[id="used_price"] > span[class="price js-price"]').text().trim().slice(1))
            let picture = $('div[class="cover"] > img').attr('src')
            
            if(!!price && !!picture){
                let {_id} = await CardSet.findOne({name: cardSet})
                console.log(typeof price)
                await Card.create({name, suffix, prefix, cardNumber, cardSet, price, picture})
                
                
            }
            res.send({price, picture}).status(200)

        } catch(e){
            res.send(e).status(500)
        }

       
    
    },
    getCardSetSlug: async (req, res) => {
        
    }
}