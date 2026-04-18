const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT,
        jobTitle TEXT,
        country TEXT,
        salary REAL
      )
    `);
});

module.exports = db;
