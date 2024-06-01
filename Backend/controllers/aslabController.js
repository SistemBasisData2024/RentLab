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

async function loginaslab(req, res) {
  const { npm, password } = req.body;
  try {
    const takePass = await pool.query("SELECT * FROM aslab WHERE npm = $1", [npm]);
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

async function signupaslab(req, res) {
  const { npm, nama, lab_id, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query("INSERT INTO aslab (npm, nama, lab_id, password) VALUES ($1, $2, $3, $4)", [npm, nama, lab_id, hashedPassword]);
    res.status(201).send("Sukses signup");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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

async function getAslabById(req, res) {
  const npm = req.params.id;
  try {
    const aslab = await pool.query("SELECT * FROM aslab WHERE npm = $1;", [npm]);
    res.status(201).send(aslab.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  loginaslab,
  signupaslab,
  CreateBarang,
  getAslabById,
};