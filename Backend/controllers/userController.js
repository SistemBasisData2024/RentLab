const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");

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

async function login(req, res) {
  const { npm, password } = req.body;
  try {
    const takePass = await pool.query("SELECT * FROM users WHERE npm = $1", [npm]);
    let hashPass = takePass.rows[0].password;
    let compare = await bcrypt.compare(password, hashPass);
    if (compare) {
      res.status(200).send("Sukses login");
    } else {
      res.status(200).send("Password salah");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function signup(req, res) {
  const { npm, nama, jurusan, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query("INSERT INTO users (npm, nama, jurusan, password) VALUES ($1, $2, $3, $4)", [npm, nama, jurusan, hashedPassword]);
    res.status(201).send("Sukses signup");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

// async function getBarangBylab(req, res) {
//   const lab_id = req.params.id;
//   try {
//     const result = await pool.query(
//       `SELECT barang.* FROM barang
//       INNER JOIN lab ON barang.lab_id = lab.id
//       WHERE barang.lab_id = $1;`,
//       [lab_id]
//     );

//     if (!result) {
//       res.status(404).send("tidak ada barang");
//     } else {
//       res.send(result.rows);
//     }
//   } catch (error) {
//     res.status(500).send({
//       err: error,
//     });
//   }
// }

// async function CreatePinjam(req, res) {
//   const { user_npm, barang_id, jumlah_barang, alasan_kebutuhan, jangka_waktu } = req.body;
//   try {
//     const takeName = await pool.query("SELECT * FROM users WHERE npm = $1", [user_npm]);
//     let name = takeName.rows[0].nama;
//     const takeBarang = await pool.query("SELECT * FROM barang WHERE id = $1", [barang_id]);
//     let barangName = takeBarang.rows[0].nama;
//     let ketersediaan = takeBarang.rows[0].jumlah_ketersediaan;
//     if (ketersediaan > jumlah_barang) {
//       let timestamp = new Date(Date.now());
//       await pool.query("INSERT INTO peminjaman (user_npm, user_nama, barang_id, barang_nama, jumlah_barang, alasan_kebutuhan, jangka_waktu, konfirmasi, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
//         user_npm,
//         name,
//         barang_id,
//         barangName,
//         jumlah_barang,
//         alasan_kebutuhan,
//         jangka_waktu,
//         "pending",
//         timestamp,
//       ]);
//       await pool.query("UPDATE barang SET jumlah_ketersediaan = jumlah_ketersediaan - $1 WHERE id = $2", [jumlah_barang, barang_id]);
//       res.status(201).send("Sukses pinjam");
//     } else {
//       res.status(201).send("Jumlah barang melebihi ketersediaan!");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// }

// async function getPeminjamanByUser(req, res) {
//   const npm = req.params.id;
//   try {
//     const result = await pool.query(
//       `SELECT peminjaman.* FROM peminjaman
//       INNER JOIN users ON peminjaman.user_npm = users.npm
//       WHERE peminjaman.user_npm = $1;`,
//       [npm]
//     );

//     if (!result) {
//       res.status(404).send("peminjaman tidak ada");
//     } else {
//       res.send(result.rows);
//     }
//   } catch (error) {
//     res.status(500).send({
//       err: error,
//     });
//   }
// }

module.exports = {
  login,
  signup,
  // getBarangBylab,
  // CreatePinjam,
  // getPeminjamanByUser,
};
