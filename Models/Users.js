const mongoose = require('mongoose');
const { Schema } = mongoose;

const cinemaSchema = new Schema({
    title:  {
        type: [String],
        required: true
    },
    frame: {
        type: [String],
        required: true
    },
    author: String,
    type: {
        type: String
    }
});

cinemaSchema.statics.random = async function() {
    const count = await this.estimatedDocumentCount().exec();
    const rand = Math.floor(Math.random() * count);
    const res = await this.findOne().skip(rand).exec();
    return res;
};

cinemaSchema.statics.randomTitle = async function(amount = 4) {
    const count = await this.estimatedDocumentCount().exec();
    const rand = Math.floor(Math.random() * count);
    const randCorrect = Math.min(count - amount, rand);
    const res = await this.find({}).skip(randCorrect).limit(amount).exec();
    const titles = res.map(item => item.title[0])
    return titles;
};


const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema