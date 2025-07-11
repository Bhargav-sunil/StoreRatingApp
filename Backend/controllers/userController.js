const db = require('../config/db');

// List all stores
exports.listStores = (req, res) => {
  db.all(`SELECT * FROM stores`, [], (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Search stores 
exports.searchStores = (req, res) => {
  const { keyword } = req.query;
  db.all(`SELECT * FROM stores WHERE name LIKE ? OR address LIKE ?`, 
    [`%${keyword}%`, `%${keyword}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
};

// Submit or update rating
exports.submitRating = (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  db.get(`SELECT * FROM ratings WHERE user_id = ? AND store_id = ?`, [user_id, store_id], (err, row) => {
    if (row) {
      db.run(`UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?`, 
        [rating, user_id, store_id], function (err2) {
          if (err2){
            return res.status(400).json({ error: err2.message });
          }
          res.json({ message: 'Rating updated' });
        });
    } else {
      db.run(`INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)`, 
        [user_id, store_id, rating], function (err2) {
          if (err2){
            return res.status(400).json({ error: err2.message });
          }
          res.status(201).json({ id: this.lastID });
        });
    }
  });
};
