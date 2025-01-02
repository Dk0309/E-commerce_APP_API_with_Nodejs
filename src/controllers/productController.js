const productModel = require("../models/productModel");

const getproductController = async (req, res) => {
  try {
    // find product
    const products = await productModel.find();
    //validation
    if (!products) {
      return res.status(404).send({
        success: false,
        message: "No Products in the DataBase...",
      });
    }
    res.status(200).send({
      products,
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Eror in Get Product API",
      error,
    });
  }
};
const createproductController = async (req, res) => {
  try {
    const { productName, model, brand, price, quantity } = req.body;

    //validation
    if (!productName || !model || !brand || !price || !quantity) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // check product
    const exisiting = await productModel.findOne({ model });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Model Already Registerd...",
      });
    }

    //create new product
    const product = await productModel.create({
      productName,
      model,
      brand,
      price,
      quantity,
    });

    res.status(201).send({
      product,
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Error In product API",
      error,
    });
  }
};
const updateproductController = async (req, res) => {
  try {
    // find product
    const product = await productModel.findById({ _id: req.params.id });
    //validation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    //update
    const { productName, brand, price, quantity } = req.body;
    if (productName) product.productName = productName;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    //save product
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Updated SUccessfully",
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Error In Update Product API",
      error,
    });
  }
};
const deleteproductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Product has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Product API",
      error,
    });
  }
};

module.exports = {
  getproductController,
  createproductController,
  updateproductController,
  deleteproductController,
};
