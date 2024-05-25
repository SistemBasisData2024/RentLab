const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
// userRouter.get("/barang/:id", userController.getBarangBylab);
// userRouter.post("/pinjam", userController.CreatePinjam);
// userRouter.get("/peminjamanUser/:id", userController.getPeminjamanByUser);

module.exports = userRouter;
