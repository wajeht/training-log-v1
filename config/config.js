const path = require('path');
// only get "root", destructure syntax
const { root } = require('../util/directory.js');

require('dotenv').config({
    path: path.join(root, '.env'),
});

const config = {
    database: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    port: {
        serverPort: process.env.PORT,
    },
};

module.exports = config;
