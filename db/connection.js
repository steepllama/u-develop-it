const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your sql username,
        user: 'root',
        // Your sql password
        password: 'Manchis1',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports =db;