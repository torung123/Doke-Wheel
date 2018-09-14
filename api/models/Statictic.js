const mongoose = require('mongoose');

const StaticticSchema = mongoose.Schema({
    displayed: {
        type: Number,
        default: 0
    },
    wheeled: {
        type: Number,
        default: 0
    },
    refuse: {
        type: Number,
        default: 0
    },
    infoCustomer: [
        {
            dwheel_name: {
                type: String
            },
            dwheel_email: {
                type: String,
                lowercase: true,
                unique: true
            }
        }
    ],
    shopHash: {
        type: String
    }
});

module.exports = mongoose.model('Statictic', StaticticSchema);