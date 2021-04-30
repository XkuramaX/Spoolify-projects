const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    currencies: {
        type: Object,
        required: true
    }

})

module.exports = mongoose.model('CurrencyRate',rateSchema)