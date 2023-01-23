const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pokemonDb", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
});

module.exports = mongoose.connection;