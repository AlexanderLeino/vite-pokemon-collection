const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        maxlength: 4,
        required: true,
    },
    
    totalNumberOfCardsInSet: {
        type: Number,
        maxlength: 3,
        required: true,
    },
}, {collection: 'CardSet'}) 

const CardSet = mongoose.model('CardSet', CardSetSchema)

module.exports = {CardSet}