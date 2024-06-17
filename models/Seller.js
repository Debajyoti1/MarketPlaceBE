const mongoose = require('mongoose');
// const Product = require('./Product'); // Adjust the path as necessary
const vendorSchema = require('./Vendor');

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imglink: {
        type: String,
    },
    vendor: {
        type: vendorSchema,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product model
    }]
}, {
    timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
