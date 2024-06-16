const mongoose = require('mongoose');
const vendorSchema = require('./Vendor');
const productSchema = require('./Product');

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
    imglink:{
        type: String,
    },
    vendor: {
        type: vendorSchema,
        required: true
    },
    products: [productSchema]
}, {
    timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
