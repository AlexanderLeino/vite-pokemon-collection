const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
const slug = require('slug')
let baseURL ="https://www.pricecharting.com/game/pokemon-"
module.exports = {
    findCard: async (req, res) => {
        let response = await axios.get(`${baseURL}-evolving-skies/umbreon-vmax-215`)
        let data = response?.data
        const $ = cheerio.load(data)
        let price = $('td[id="used_price"] > span[class="price js-price"]').text().trim()
        let picture = $('div[class="cover"] > img').attr('src')
        let TCGPlayerId = $('td[class="details"] > a[id="js-tcg-id-link"]').text().trim()
        console.log('Player ID', TCGPlayerId)
        console.log('Picture', picture)
        console.log(price)

       
        
        
    //     try {
    //         const options = {
    //             method: 'GET',
    //             url: 'https://unogsng.p.rapidapi.com/search',
    //             params: {genrelist: '1694', type: 'movie', limit: 5},
    //             headers: {
    //               'X-RapidAPI-Key': process.env.API_KEY,
    //               'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
    //             }
    //           };
    //         let response = await axios.request(options)
    //         console.log(response.data)
           
    //         res.status(200).send(response.data)
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    res.send({price, picture}).status(200)
    },
    getCardSetSlug: async (req, res) => {
        
    }
}