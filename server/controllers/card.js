const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
const { default: slugify } = require('slugify')
const CardSet = require('../models/CardSet')
const Card = require('../models/Card')
const User = require('../models/User')
let baseURL ="https://www.pricecharting.com/game/pokemon-"

module.exports = {
    findCard: async ({body}, res) => {
        try {

            let { name, prefix, suffix, cardNumber, cardSet, artist, cardType, userId} = body.data
            console.log('WO', userId)
            let cardSetSlug = slugify(cardSet).toLowerCase()
            let slugArray = []
            
            for (const cardProperty in body.data){
                if(body.data[cardProperty] && cardProperty != 'cardSet' && cardProperty != 'artist' && cardProperty != "cardType" && cardProperty != 'userId'){
                    slugArray.push(body.data[cardProperty])
                }
                
            }
            let slugifiedString = slugify(slugArray.join(" ").toLowerCase())
            console.log(`${baseURL}${cardSetSlug}/${slugifiedString}`)
            let response = await axios.get(`${baseURL}${cardSetSlug}/${slugifiedString}`)

            let data = response?.data

            const $ = cheerio.load(data)
            //Using the slice method to remove the $ from the returned value for the price
            let price = parseFloat($('td[id="used_price"] > span[class="price js-price"]').text().trim().slice(1))
            let picture = $('div[class="cover"] > img').attr('src')
            console.log('price:', price)
            if(!!price && !!picture){
                let {_id} = await CardSet.findOne({name: cardSet})
                console.log(typeof price)

                let {_id: cardId} = await Card.create({name, suffix, prefix, cardNumber, cardSet: _id, price, picture, artist, cardType})
                console.log('Card ID', cardId)
                
                if(cardId){
                    console.log('made it in the if block')
                    let userUpdated = await User.updateOne({_id: userId}, {
                        $push: {
                            cards: cardId
                        }
                    })
                    console.log('UserUpdated', userUpdated)
                }
                
            }
            res.send({price, picture}).status(200)

        } catch(e){
            res.send(e).status(500)
        }

       
    
    },
    getCardSetSlug: async (req, res) => {
        
    }
}