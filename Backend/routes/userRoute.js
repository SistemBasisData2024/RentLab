const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/signupaslab", userController.signupaslab);
userRouter.post("/loginaslab", userController.loginaslab);

module.exports = userRouter;
