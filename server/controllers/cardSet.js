require('dotenv').config()
const {CardSet} = require('../models')
module.exports = {
    getAllCardSets: async (req, res) => {
        try {
            let sets = await CardSet.find({})
            res.send(sets).status(200)
        } catch(e) {
            res.send({message: e.message}).status(200)
        }
    },
    
    findOneCardSet: async (req, res) => {
        try {
            let {name} = await CardSet.findOne({_id: req.body.data[0]})
            console.log("FOUND ONE CAR SET", name)
            res.send({name}).status(200)
        } catch(e) {
            console.log(e)
            res.send({message: e.message})
        }
    }
}