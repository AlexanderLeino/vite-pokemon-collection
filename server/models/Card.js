const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    cardType: {
        type: String,
        enum: ['Stadium', 'Trainer', 'Pokemon', 'Energy'],
        required: true,
    },
    trainerType: {
        type: String,
        enum: ["Item", "Supporter"],
        require: this.cardType === 'Trainer'
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
    elementType: {
        type: String,
        enum: ['Fire', 'Fighting', 'Dragon', 'Lighting', 'Grass', 'Water', 'Fairy', 'Psychic', 'Metal', 'Colorless'],
        required: this.cardType === 'Pokemon',
    },
    cardSet: [{
        type: Schema.Types.ObjectId, ref: 'CardSet'
    }],
        
    rarity: {
        type: String,
    }, 
    price: {
        type: Number,
    },
    picture: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1
    },
    
},{collection: 'Card'})

const Card = mongoose.model('Card', CardSchema)

module.exports = Card