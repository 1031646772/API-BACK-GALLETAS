const mysql2 = require('mysql2');
const { createConnection } = require('mysql2');

const database = mysql2.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT,
});

module.exports = database;