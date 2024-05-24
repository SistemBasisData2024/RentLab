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

async function login(req, res) {
  const { npm, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE npm = $1 AND password = $2", [npm, password]);
    if (rows.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    res.status(200).send("Sukses login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function signup(req, res) {
  const { npm, nama, jurusan, password } = req.body;
  try {
    await pool.query("INSERT INTO users (npm, nama, jurusan, password) VALUES ($1, $2, $3, $4)", [npm, nama, jurusan, password]);
    res.status(201).send("Sukses signup");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  login,
  signup,
};
