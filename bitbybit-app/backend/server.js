const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Missing fields");

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], function(err) {
    if (err) return res.status(400).send("User already exists");
    res.status(201).send("User registered successfully");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Missing fields");

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (err) return res.status(500).send("Server error");
    if (!row) return res.status(401).send("Invalid credentials");

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(401).send("Invalid credentials");

    res.send("Login successful");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
