const express = require("express");
const userRouter = require("./userRoute.js");
const aslabRouter = require("./aslabRoute");
const barangRouter = require("./barangRoute");
const pinjamRouter = require("./pinjamRoute.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/aslab", aslabRouter);
router.use("/pinjam", pinjamRouter);
router.use("/barang", barangRouter);

module.exports = router;
