const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('debug', true);

mongoose.connect(`${process.env.MONGO_URL + process.env.MONGO_DB}`,
    { useNewUrlParser: true, autoIndex: false },
    function(err){
        if(err) return console.log(err);
    }
);

module.exports = mongoose;
