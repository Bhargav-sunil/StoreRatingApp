const db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  address TEXT NOT NULL,
  role TEXT CHECK(role IN ('System Administrator', 'Normal User', 'Store Owner')) NOT NULL
)`);

db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
db.run(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);

module.exports = db;
