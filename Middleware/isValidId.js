const mongoose = require('mongodb');

function isValidId(id) {
    return mongoose.ObjectID.isValid(id)
}
module.exports = {isValidId}