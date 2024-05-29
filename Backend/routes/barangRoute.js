const barangController = require("../controllers/barangController");
const express = require("express");
const barangRouter = express.Router();

barangRouter.get("/getBarang/:id", barangController.getBarangBylab);
barangRouter.post("/addBarang", barangController.CreateBarang);
barangRouter.put("/editBarang/:id", barangController.EditBarang);
barangRouter.delete("/deleteBarang/:id", barangController.DeleteBarang);

module.exports = barangRouter;
