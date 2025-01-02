const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
  },
  userEmail: {
    type: String,
    required: [true, "email is required"],
  },
  productName: {
    type: String,
    required: [true, "productname is required"],
  },
  productModel: {
    type: String,
    required: [true, "model is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
});

module.exports = mongoose.model("order", orderSchema);
