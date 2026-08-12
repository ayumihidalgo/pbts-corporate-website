const Database = require('better-sqlite3')
const db = new Database('data/contacts.db')
const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all()
console.table(rows)