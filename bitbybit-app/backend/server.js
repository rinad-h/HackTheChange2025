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

db.run(`PRAGMA foreign_keys = ON`);

// Users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password TEXT
)`);

// Posts table (with lat/lng)
db.run(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT,
  category TEXT NOT NULL,
  desc TEXT NOT NULL,
  author TEXT NOT NULL,
  lat REAL,
  lng REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Comments table
db.run(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  author TEXT,          
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
)`);

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).send("Missing fields");

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword],
    function(err) {
      if (err) {
        if (err.message.includes("username")) return res.status(400).send("Username already exists");
        if (err.message.includes("email")) return res.status(400).send("Email already exists");
        return res.status(500).send("Database error");
      }
      res.status(201).send("User registered successfully");
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Missing fields");

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
    if (err) return res.status(500).send("Server error");
    if (!row) return res.status(401).send("Invalid credentials");

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(401).send("Invalid credentials");

    res.json({ message: "Login successful", username: row.username });
  });
});

// Create post
app.post("/posts", (req, res) => {
  const { title, location, category, desc, author, lat, lng } = req.body;
  if (!title || !category || !desc) return res.status(400).send("Missing Fields");

  db.run(
    `INSERT INTO posts (title, location, category, desc, author, lat, lng) VALUES (?,?,?,?,?,?,?)`,
    [title, location || "", category, desc, author, lat, lng],
    function(err) {
      if (err) return res.status(500).send("Database Error");
      db.get(`SELECT * FROM posts WHERE id = ?`, [this.lastID], (e, row) => {
        if (e) return res.status(500).send("Database Error");
        res.status(201).json(row);
      });
    }
  );
});

// List posts
app.get("/posts", (req, res) => {
  const { category } = req.query;
  let query = `SELECT * FROM posts`;
  const params = [];

  if (category) {
    query += ` WHERE category = ?`;
    params.push(category);
  }

  query += ` ORDER BY datetime(created_at) DESC`;

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).send("DB error");
    res.json(rows);
  });
});

// Get single post
app.get("/posts/:id", (req, res) => {
  db.get(`SELECT * FROM posts WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).send("DB error");
    if (!row) return res.status(404).send("Not found");
    res.json(row);
  });
});

// List comments for a post
app.get("/posts/:id/comments", (req, res) => {
  db.all(
    `SELECT * FROM comments WHERE post_id = ? ORDER BY datetime(created_at) ASC`,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).send("DB error");
      res.json(rows);
    }
  );
});

// Add comment to a post
app.post("/posts/:id/comments", (req, res) => {
  const { body, author } = req.body;
  if (!body) return res.status(400).send("Missing body");

  db.run(
    `INSERT INTO comments (post_id, body, author) VALUES (?, ?, ?)`,
    [req.params.id, body, author || ""],
    function(err) {
      if (err) return res.status(500).send("DB error");
      db.get(`SELECT * FROM comments WHERE id = ?`, [this.lastID], (e, row) => {
        if (e) return res.status(500).send("DB error");
        res.status(201).json(row);
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
