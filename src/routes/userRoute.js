const express = require("express");
const {
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");
const userRouter = express.Router();

//routes
userRouter.get("/users", getUserController);
userRouter.post("/createuser", createUserController);
userRouter.put("/updateuser/:id", updateUserController);
userRouter.delete("/deleteuser/:id", deleteUserController);

//exports
module.exports = userRouter;
