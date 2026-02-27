const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'budget.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.error('Error with connection: ', err.message);
    } else {
        console.log('Database connected SQLite (database.js)');

        db.run(`CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )`, (err) => {
            if (err) console.error('Error creating table:', err.message);
        });
    }
})

module.exports = db;