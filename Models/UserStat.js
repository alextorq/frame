const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types
const { Schema } = mongoose;

const userStatsSchema = new Schema({
    user: {
      type: ObjectId
    },
    sessionID: {
      type: String
    },
    cinema: {
        type: ObjectId,
        required: true
    },
    answer: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });



const UserStat = mongoose.model('UserStat', userStatsSchema);

module.exports = UserStat