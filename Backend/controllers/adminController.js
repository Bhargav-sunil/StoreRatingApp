const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Add user
exports.addUser = (req, res) => {
  const { name, email, password, address, role } = req.body;
  
  const hashed = bcrypt.hashSync(password, 10);

  db.run(`INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashed, address, role],
    function (err) {
      if (err){
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
};

// Add  store
exports.addStore = (req, res) => {
  const { name, email, address } = req.body;

  db.run(`INSERT INTO stores (name, email, address) VALUES (?, ?, ?)`,
    [name, email, address],
    function (err) {
      if (err){
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
};

// Get total stats
exports.getStats = (req, res) => {
  const stats = {};
  db.get(`SELECT COUNT(*) as totalUsers FROM users`, [], (err, row) => {
    stats.totalUsers = row.totalUsers;
    db.get(`SELECT COUNT(*) as totalStores FROM stores`, [], (err, row2) => {
      stats.totalStores = row2.totalStores;
      db.get(`SELECT COUNT(*) as totalRatings FROM ratings`, [], (err, row3) => {
        stats.totalRatings = row3.totalRatings;
        res.json(stats);
      });
    });
  });
};

// List all users
exports.listUsers = (req, res) => {
  const { role } = req.query;
  let query = `SELECT * FROM users`;
  if (role) {
    query += ` WHERE role = '${role}'`;
  }
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
