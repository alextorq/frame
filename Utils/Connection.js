const mongoose = require('mongoose');
const env = require('dotenv').config();

const envParse = env.parsed

let connectionString = `${process.env.MONGO_URL + process.env.MONGO_DB}`;

if (envParse.MODE === 'develop') {
    mongoose.set('debug', true);
} else {
    connectionString = `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + connectionString
}

mongoose.connect('mongodb://' + connectionString,
    { useNewUrlParser: true, autoIndex: false },
    function(err){
        if(err) return console.log(err);
    }
);

module.exports = mongoose;
