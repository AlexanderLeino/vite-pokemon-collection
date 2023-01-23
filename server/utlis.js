const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.secret

const signToken = (user) => {
    let token = jwt.sign({
        userId: user._id,
        userName: user.userName,
        email: user.email 
    }, secret, {expiresIn: '1h'})
    console.log('created Token before return', token)
    return token
}
const verifyToken = (token) => {
    
}

module.exports = {signToken}


