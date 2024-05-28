const pinjamController = require("../controllers/pinjamController");
const express = require("express");
const pinjamRouter = express.Router();

pinjamRouter.post("/addPinjam", pinjamController.CreatePinjam);
pinjamRouter.get("/getPinjamUser/:id", pinjamController.getPeminjamanByUser);
pinjamRouter.get("/getPinjamAslab/:id", pinjamController.getAllPeminjaman);
pinjamRouter.delete("/deletePinjam/:id", pinjamController.deletePinjaman);
pinjamRouter.put("/updateKonfirmasi/:id", pinjamController.updatePinjaman);

module.exports = pinjamRouter;
