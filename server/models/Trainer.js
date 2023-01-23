const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrainerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cardNumber: {
        type: Number,
        maxlength: 3,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    cardSet: {
        type: Schema.Types.ObjectId, ref:'CardSet'
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const Trainer = mongoose.model('Trainers', TrainerSchema)

module.exports = Trainer