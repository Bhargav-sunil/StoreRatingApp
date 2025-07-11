const db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  store_id INTEGER NOT NULL,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(store_id) REFERENCES stores(id)
)`);

db.run(`CREATE INDEX IF NOT EXISTS idx_rating_user_id ON ratings(user_id)`);
db.run(`CREATE INDEX IF NOT EXISTS idx_rating_store_id ON ratings(store_id)`);

module.exports = db;
