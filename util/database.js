const mysql = require('mysql2');
const config = require('../config/config.js');

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
});

module.exports = pool.promise();
