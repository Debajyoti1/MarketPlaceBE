const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    purity: {
      type: String,
      required: true,
    },
    producttype: {
      type: String,
      required: true,
    },
    imglink: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
