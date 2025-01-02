const UserModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    // find user
    const user = await UserModel.find();
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Users Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Eror in Get User API",
      error,
    });
  }
};

const createUserController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    //validation
    if (!name || !email || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // check user
    const exisiting = await UserModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registerd...",
      });
    }

    //create new user
    const user = await UserModel.create({
      name,
      email,
      address,
      phone,
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Error In created API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await UserModel.findById({ _id: req.params.id });
    console.log(user);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { name, address, phone } = req.body;
    if (name) user.name = name;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated SUccessfully",
    });
  } catch (error) {
    console.log("err : ", error);
    res.status(500).send({
      success: false,
      message: "Error In Udpate Userr API",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "User has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
