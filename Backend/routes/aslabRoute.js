const aslabController = require("../controllers/aslabController");
const express = require("express");
const aslabRouter = express.Router();

aslabRouter.post("/signup", aslabController.signupaslab);
aslabRouter.post("/login", aslabController.loginaslab);
aslabRouter.post("/addbarang", aslabController.CreateBarang);

module.exports = aslabRouter;
