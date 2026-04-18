const sqlite3 = require("sqlite3").verbose();

const isTest = process.env.NODE_ENV === "test";

const db = new sqlite3.Database(isTest ? ":memory:" : "./database.sqlite");

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
