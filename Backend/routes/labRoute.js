const labController = require("../controllers/labController");
const express = require("express");
const labRouter = express.Router();

labRouter.get("/getAll", labController.getAllLab);

module.exports = labRouter;
