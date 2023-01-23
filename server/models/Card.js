const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CardSet = require('./CardSet')


const CardSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    prefix: {
        type: String,
        trim: true
    },
    suffix: {
        type: String,
        trim: true,
    }, 
    type: {
        type: String,
        required: true,
    },
    move1: {
        type: String,
        
        trim: true,
    },
    damage1:{
        type: String,
       
        trim: true,
    },

    move1Description: {
        type: String,
        maxlength: 150,
      
        trim: true,
    },
    move2: {
        type: String,
      
        trim: true,
    },
    damage2: {
        type: String,
       
        trim: true,
    },

    move2Description: {
        type: String,
        maxlength: 150,
    
    },

    artist: {
        type: String,
        required: true,
        trim: true,
    },

    cardType: {
        type: String,
        required: true,
    },

    originalCardSet: [{
        type: Schema.Types.ObjectId, ref: 'CardSet'
    }],
        
    rarity: {
        type: String,
        default: 'common'
    }, 

    quantity: {
        type: Number,
        default: 1
    },
    
},{collection: 'Card'})

const Card = mongoose.model('Card', CardSchema)

module.exports = Card