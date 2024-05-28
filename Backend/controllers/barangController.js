const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // This disables certificate verification (not recommended for production)
  },
});

async function getBarangBylab(req, res) {
  const lab_id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT barang.* FROM barang
      INNER JOIN lab ON barang.lab_id = lab.id 
      WHERE barang.lab_id = $1;`,
      [lab_id]
    );

    if (!result) {
      res.status(404).send("tidak ada barang");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    res.status(500).send({
      err: error,
    });
  }
}

async function CreateBarang(req, res) {
  const { nama, lab_id, jumlah_ketersediaan, image_url } = req.body;
  try {
    await pool.query("INSERT INTO barang (nama, lab_id, jumlah_ketersediaan, image_url) VALUES ($1, $2, $3, $4)", [nama, lab_id, jumlah_ketersediaan, image_url]);
    res.status(201).send("Sukses menambah barang");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function DeleteBarang(req, res) {
  const id_barang = req.params.id;
  try {
    await pool.query("DELETE FROM barang WHERE id = $1", [id_barang]);
    res.status(201).send("Sukses menghapus barang");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function EditBarang(req, res) {
  const id_barang = req.params.id;
  const { nama, lab_id, jumlah_ketersediaan, image_url } = req.body;
  try {
    await pool.query("UPDATE barang SET nama = $1, lab_id = $2, jumlah_ketersediaan = $3, image_url = $4 WHERE id = $5", [nama, lab_id, jumlah_ketersediaan, image_url, id_barang]);
    res.status(201).send("Sukses mengedit barang");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getBarangBylab,
  CreateBarang,
  DeleteBarang,
  EditBarang,
};
