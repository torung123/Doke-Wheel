const mongoose = require('mongoose');

const InfoCustomerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    shopName: {
        type: String
    }
});

module.exports = mongoose.model('InfoCustomer', InfoCustomerSchema);