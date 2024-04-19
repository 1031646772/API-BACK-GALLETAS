const mysql2 = require('mysql2');
const { createConnection } = require('mysql2');

const database = mysql2.createConnection({
    host: process.env.MYSQLHOST || 'http://roundhouse.proxy.rlwy.net/',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'HHg2fbH156365a5Dg2GEbBheceH6Dfaf',
    database: process.env.MYSQL_DATABASE || 'railway',
    port: process.env.MYSQLPORT || 10784,
});

module.exports = database;