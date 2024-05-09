const mysql2 = require('mysql2');
const { createConnection } = require('mysql2');

const database = mysql2.createConnection({
    host: process.env.MYSQLHOST || 'galletasyhojaldres.mysql.database.azure.com',
    user: process.env.MYSQLUSER || 'root1',
    password: process.env.MYSQLPASSWORD || 'juli1234!',
    database: process.env.MYSQL_DATABASE || 'galletasyhojaldres',
    port: process.env.MYSQLPORT || 3306,
});

module.exports = database;