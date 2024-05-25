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

async function CreatePinjam(req, res) {
  const { user_npm, barang_id, jumlah_barang, alasan_kebutuhan, jangka_waktu } = req.body;
  try {
    const takeName = await pool.query("SELECT * FROM users WHERE npm = $1", [user_npm]);
    let name = takeName.rows[0].nama;
    const takeBarang = await pool.query("SELECT * FROM barang WHERE id = $1", [barang_id]);
    let barangName = takeBarang.rows[0].nama;
    let ketersediaan = takeBarang.rows[0].jumlah_ketersediaan;
    if (ketersediaan > jumlah_barang) {
      let timestamp = new Date(Date.now());
      await pool.query("INSERT INTO peminjaman (user_npm, user_nama, barang_id, barang_nama, jumlah_barang, alasan_kebutuhan, jangka_waktu, konfirmasi, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
        user_npm,
        name,
        barang_id,
        barangName,
        jumlah_barang,
        alasan_kebutuhan,
        jangka_waktu,
        "pending",
        timestamp,
      ]);
      await pool.query("UPDATE barang SET jumlah_ketersediaan = jumlah_ketersediaan - $1 WHERE id = $2", [jumlah_barang, barang_id]);
      res.status(201).send("Sukses pinjam");
    } else {
      res.status(201).send("Jumlah barang melebihi ketersediaan!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getPeminjamanByUser(req, res) {
  const npm = req.params.id;
  try {
    const result = await pool.query(
      `SELECT peminjaman.* FROM peminjaman 
      INNER JOIN users ON peminjaman.user_npm = users.npm 
      WHERE peminjaman.user_npm = $1;`,
      [npm]
    );

    if (!result) {
      res.status(404).send("peminjaman tidak ada");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    res.status(500).send({
      err: error,
    });
  }
}

async function getAllPeminjaman(req, res) {
  const npm = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM peminjaman");
    if (!result) {
      res.status(404).send("peminjaman tidak ada");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    res.status(500).send({
      err: error,
    });
  }
}

async function deletePinjaman(req, res) {
  const id_pinjam = req.params.id;
  try {
    await pool.query("DELETE FROM peminjaman WHERE id = $1", [id_pinjam]);
    res.status(201).send("Sukses menghapus pinjaman");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  CreatePinjam,
  getPeminjamanByUser,
  getAllPeminjaman,
  deletePinjaman,
};
