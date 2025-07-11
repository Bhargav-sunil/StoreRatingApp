const db = require('../config/db');

// View ratings
exports.viewRatings = (req, res) => {
  const storeOwnerEmail = req.user.email;

  db.get(`SELECT id FROM stores WHERE email = ?`, [storeOwnerEmail], (err, store) => {
    if (!store){
      return res.status(404).json({ message: 'Store not found' });
    }

    db.all(`
      SELECT users.name, ratings.rating
      FROM ratings
      JOIN users ON ratings.user_id = users.id
      WHERE ratings.store_id = ?
    `, [store.id], (err2, rows) => {
      if (err2) {
        return res.status(500).json({ error: err2.message });
      }
      res.json(rows);
    });
  });
};

// Calculate average rating
exports.averageRating = (req, res) => {
  const storeOwnerEmail = req.user.email;

  db.get(`SELECT id FROM stores WHERE email = ?`, [storeOwnerEmail], (err, store) => {
    if (!store){
      return res.status(404).json({ message: 'Store not found' });
    }

    db.get(`SELECT AVG(rating) as avg FROM ratings WHERE store_id = ?`, [store.id], (err2, row) => {
      if (err2) {
        return res.status(500).json({ error: err2.message });
      }
      res.json({ average: row.avg ?? 0 });
    });
  });
};

exports.addStore = (req, res) => {
  const { name, email, address } = req.body;

  db.run(`INSERT INTO stores (name, email, address) VALUES (?, ?, ?)`,
    [name, email, address],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
};
