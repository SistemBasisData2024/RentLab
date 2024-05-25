const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/pinjam", userController.CreatePinjam);

module.exports = userRouter;
