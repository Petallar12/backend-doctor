const mysql = require('mysql2');

// Configure the MySQL connection pool
const db = mysql.createPool({
    host: "77.37.34.157",   // Replace with your Hostinger MySQL server IP
    user: "u986804453_root",  // Replace with your Hostinger database username
    password: "M3D1shure@!",  // Replace with your Hostinger database password
    database: "u986804453_datalokey",  // Replace with your Hostinger database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check for connection errors
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
    connection.release();
});

module.exports = db;
