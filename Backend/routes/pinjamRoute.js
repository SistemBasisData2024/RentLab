const pinjamController = require("../controllers/pinjamController");
const express = require("express");
const pinjamRouter = express.Router();

pinjamRouter.post("/addPinjam", pinjamController.CreatePinjam);
pinjamRouter.get("/getPinjam/:id", pinjamController.getPeminjamanByUser);
pinjamRouter.get("/getAllPinjam", pinjamController.getAllPeminjaman);
pinjamRouter.delete("/deletePinjam/:id", pinjamController.deletePinjaman);

module.exports = pinjamRouter;
