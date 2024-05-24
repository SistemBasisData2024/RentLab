const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

module.exports = userRouter;