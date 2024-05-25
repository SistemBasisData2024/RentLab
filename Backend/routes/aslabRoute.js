const aslabController = require("../controllers/aslabController");
const express = require("express");
const aslabRouter = express.Router();

aslabRouter.post("/signup", aslabController.signupaslab);
aslabRouter.post("/login", aslabController.loginaslab);

module.exports = aslabRouter;
