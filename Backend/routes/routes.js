const express = require("express");
const userRouter = require("./userRoute.js");
const aslabRouter = require("./aslabRoute");
const barangRouter = require("./barangRoute");
const pinjamRouter = require("./pinjamRoute.js");
const labRouter = require("./labRoute.js");
const uploadRoute = require("../cloudinary/routeUpload.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/aslab", aslabRouter);
router.use("/pinjam", pinjamRouter);
router.use("/barang", barangRouter);
router.use("/lab", labRouter);
router.use("/cloudinary", uploadRoute);

module.exports = router;
