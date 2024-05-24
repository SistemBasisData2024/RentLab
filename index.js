const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const bodyParser = require("body-parser");
const accountRepo = require("./repositories/repository.account");

const port = 8463;
const app = express();

app.use(bodyParser.json());
dotenv.config();
app.use(cors());

app.post("/login", accountRepo.login);
app.post("/signup", accountRepo.signup);

app.listen(process.env.PORT, () => {
  console.log("🚀 Server is running and listening on port ", port);
});
