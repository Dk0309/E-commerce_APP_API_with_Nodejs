const mongoose = require("mongoose");

//database connetiom
const dbConnect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connected to the database!"));
};

module.exports = dbConnect;
