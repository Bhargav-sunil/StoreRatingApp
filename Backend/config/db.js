const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/storeRatings.db', (err) => {
  if (err) {
    console.error('Could not connect to SQLite:', err.message);
  }
  else{
    console.log('Connected to the storeRatings database.');
  }
});

module.exports = db;
