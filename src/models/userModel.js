const mongoose = require("mongoose");

//Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
});

module.exports = mongoose.model("users", UserSchema);
