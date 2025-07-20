const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    offerId: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: [String],
        required: true
    },
    offerText: {
        type: String,
        required: true
    },
    offerDescription: {
        type: String,
        required: true
    },
    paymentInstruments: {
        type: [String],
        required: false // Bonus part
    }
});

module.exports = mongoose.model('Offer', offerSchema);
