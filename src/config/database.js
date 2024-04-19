const mysql2 = require('mysql2');
const { createConnection } = require('mysql2');

const database = mysql2.createConnection({
    host: process.env.MYSQLHOST || 'roundhouse.proxy.rlwy.net',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || 'tNFwBsbdBYuMzLNnitKirkfNEjjYDZjf',
    database: process.env.MYSQL_DATABASE || 'railway',
    port: process.env.MYSQLPORT || 54946,
});

module.exports = database;