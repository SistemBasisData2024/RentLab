const express = require("express");
const userRouter = require("./userRoute.js");
const aslabRouter = require("./aslabRoute");

const router = express.Router();

router.use("/user", userRouter);
router.use("/aslab", aslabRouter);

module.exports = router;
