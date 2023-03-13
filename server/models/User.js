const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {CardSchema} = require('./Card')
const bcrypt = require('bcrypt')
const saltRounds = 10

const validateEmail = (string) => {
    const regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    let result = regex.test(string)
    return result
}

let custom = [validateEmail, 'Please try again. Invalid Email.']

const UserSchema = new Schema({
    userName: {
        type: String,
        maxlength: 15,
        unique: true,
        required: [true, 'Please Create A Unique Username'],
    },
    password: {
        type: String, 
        required: [true,'A Password is required']

    },
    firstName: {
        type: String,
    }, 
    lastName: {
        type: String,
    },
    email: {
        type: String,
        validate: custom,
    },
    cards: [CardSchema],
    
    portfolioValue: {
        type: Number

    }
})

UserSchema.pre('save', function(next) {
    let user = this
    //If password isnt different than the original -> return 
    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, saltRounds, function(err, result){
        if(err) return next(err)
        user.password = result
        next()
    })
})

UserSchema.virtual('portfolio').get(function(){
   
    return totalValue = this.cards.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.quantity)
    },0)   
})

const User = mongoose.model('User', UserSchema)

module.exports = User