const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
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

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (!user || err){
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
};
