const db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL
)`);

db.run(`CREATE INDEX IF NOT EXISTS idx_stores_name ON stores(name)`);

module.exports = db;
