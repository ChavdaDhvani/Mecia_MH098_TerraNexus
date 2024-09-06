// db.js
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mkdir@31',
  database: 'terranexus_database'
});

// Export the pool
module.exports = pool;
