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
    let idLab = takeBarang.rows[0].lab_id;
    let barangName = takeBarang.rows[0].nama;
    let ketersediaan = takeBarang.rows[0].jumlah_ketersediaan;
    if (ketersediaan >= jumlah_barang) {
      let timestamp = new Date(Date.now());
      await pool.query("INSERT INTO peminjaman (user_npm, user_nama, barang_id, barang_nama, jumlah_barang, alasan_kebutuhan, jangka_waktu, konfirmasi, created_at, lab_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
        user_npm,
        name,
        barang_id,
        barangName,
        jumlah_barang,
        alasan_kebutuhan,
        jangka_waktu,
        "pending",
        timestamp,
        idLab,
      ]);
      await pool.query("UPDATE barang SET jumlah_ketersediaan = jumlah_ketersediaan - $1 WHERE id = $2", [jumlah_barang, barang_id]);
      await pool.query("UPDATE barang SET jumlah_rent = jumlah_rent + $1 WHERE id = $2", [jumlah_barang, barang_id]);
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
  const lab_id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM peminjaman WHERE lab_id = $1;", [lab_id]);
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

async function getPending(req, res) {
  const lab_id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM peminjaman WHERE lab_id = $1 AND konfirmasi IN ('pending', 'rent');", [lab_id]);
    if (result.rows.length === 0) {
      res.status(404).send("Tidak ada peminjaman yang sedang pending");
    } else {
      res.send(result.rows);
    }
  } catch (error) {
    res.status(500).send({
      err: error,
    });
  }
}

async function updatePinjaman(req, res) {
  const peminjaman_id = req.params.id;
  const { status } = req.body;
  try {
    // Update konfirmasi field
    const result = await pool.query("UPDATE peminjaman SET konfirmasi = $1 WHERE id = $2 RETURNING *;", [status, peminjaman_id]);

    if (!result.rows.length) {
      return res.status(404).send("peminjaman tidak ditemukan");
    }

    // Jika status adalah 'rent', update created_at dan jatuh_tempo
    if (status === "rent") {
      const timestamp = new Date();
      const jangka_waktu = result.rows[0].jangka_waktu;
      const jatuh_tempo = new Date(timestamp);
      jatuh_tempo.setDate(jatuh_tempo.getDate() + jangka_waktu);

      // Update created_at dan jatuh_tempo
      await pool.query("UPDATE peminjaman SET created_at = $1, jatuh_tempo = $2 WHERE id = $3;", [timestamp, jatuh_tempo, peminjaman_id]);

      // Ambil kembali baris yang telah diperbarui
      const updatedResult = await pool.query("SELECT * FROM peminjaman WHERE id = $1;", [peminjaman_id]);

      return res.send(updatedResult.rows[0]);
    }

    // Jika status adalah 'success', update tabel barang
    if (status === "success") {
      // Ambil data peminjaman untuk mendapatkan barang_id dan jumlah_barang
      const peminjamanData = result.rows[0];
      const barang_id = peminjamanData.barang_id;
      const jumlah_barang = peminjamanData.jumlah_barang;

      // Update tabel barang
      await pool.query("UPDATE barang SET jumlah_ketersediaan = jumlah_ketersediaan + $1, jumlah_rent = jumlah_rent - $2 WHERE id = $3;", [jumlah_barang, jumlah_barang, barang_id]);

      // Ambil kembali baris yang telah diperbarui dari tabel barang
      const updatedBarangResult = await pool.query("SELECT * FROM barang WHERE id = $1;", [barang_id]);

      return res.send(updatedBarangResult.rows[0]);
    }

    // Jika tidak, kirim hasil awal
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send({
      err: error.message,
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

async function deleteByBarangId(req, res) {
  const barangId = req.params.id;
  try {
    await pool.query("DELETE FROM peminjaman WHERE barang_id = $1;", [barangId]);
    res.status(200).send({ message: "Referensi di tabel peminjaman berhasil dihapus" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting references in peminjaman", error });
  }
}

module.exports = {
  CreatePinjam,
  getPeminjamanByUser,
  getAllPeminjaman,
  deletePinjaman,
  updatePinjaman,
  getPending,
  deleteByBarangId,
};
