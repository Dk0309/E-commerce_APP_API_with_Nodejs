const express = require("express");
const {
  getproductController,
  createproductController,
  updateproductController,
  deleteproductController,
} = require("../controllers/productController");

const prodRouter = express.Router();

//routes
prodRouter.get("/products", getproductController);
prodRouter.post("/createproduct", createproductController);
prodRouter.put("/updateproduct/:id", updateproductController);
prodRouter.delete("/deleteproduct/:id", deleteproductController);

module.exports = prodRouter;
