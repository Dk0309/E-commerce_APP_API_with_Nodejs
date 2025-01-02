const mongoose = require("mongoose");

//schema
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "name is required"],
  },
  model: {
    type: String,
    required: [true, "model is required"],
    unique: true,
  },
  brand: {
    type: String,
    required: [true, "brand is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
});

//export
module.exports = mongoose.model("products", ProductSchema);
