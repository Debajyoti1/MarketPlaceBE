const mongoose = require('mongoose');
const addressSchema = require('./Address');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    }
});

module.exports = vendorSchema;
