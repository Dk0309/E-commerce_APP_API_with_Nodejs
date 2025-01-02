const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

const soldProductController = async (req, res) => {
  try {
    const { userName, userEmail, productName, productModel, quantity } =
      req.body;

    //validation
    if (!userName || !userEmail || !productName || !productModel || !quantity) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const authUser = await userModel.find({ email: req.body.userEmail });
    // console.log(authUser);
    if (authUser.length == 0) {
      return res.status(404).send({
        success: false,
        message: "Users Not Found",
      });
    }

    const product = await ProductModel.find({
      model: req.body.productModel,
    });
    // console.log(product);

    if (product.length == 0) {
      return res.status(404).send({
        success: false,
        message: "Products Not Available...",
      });
    }
    const actualQuantity = product[0].quantity;
    const orderQuantity = quantity;

    if (actualQuantity < orderQuantity) {
      return res.status(404).send({
        success: false,
        message: "order quantity is not available",
        availableQuantity: product[0].quantity,
      });
    }

    const finalAvaiQuantity = product[0].quantity - quantity;
    // console.log(finalAvaiQuantity);
    // res.json({ available: finalAvaiQuantity });

    if (quantity) product[0].quantity = finalAvaiQuantity;

    await product[0].save();

    //create new order
    const order = await orderModel.create({
      userName,
      userEmail,
      productName,
      productModel,
      quantity,
    });

    res.status(201).send({
      order,
      message: "product sold",
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Error In order Product API",
      error,
    });
  }
};

module.exports = soldProductController;
