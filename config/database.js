const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool({
  user: config.database.username,
  password: config.database.password,
  database: config.database.database,
  host: config.database.host,
  port: config.database.port,
});

module.exports = pool;
