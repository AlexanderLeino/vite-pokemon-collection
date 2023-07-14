require('dotenv').config()
const {CardSet} = require('../models/CardSet')
module.exports = {
    getAllCardSets: async (req, res) => {
        try {
            let sets = await CardSet.find({}).sort({name: 'asc' })
            res.send(sets).status(200)
        } catch(e) {
            res.send({message: e.message}).status(400)
        }
    },
    
    findOneCardSet: async (req, res) => {
        try {
            let {name} = await CardSet.findOne({_id: req.body.data[0]})
            res.send({name}).status(200)
        } catch(e) {
            console.log(e)
            res.send({message: e.message}).status(400)
        }
    },
    addCardSet: async (req, res) => {
        console.log(req.body)
        let {cardSetName, year, totalNumberOfCardsInSet} = req.body.data
       
        try {
            await CardSet.create({name: cardSetName, year, totalNumberOfCardsInSet})
            res.send({message: "created Successfully"}).status(200)
        }
        catch(e) {
            res.send({message:e.message}).status(400)
        }
    }
}