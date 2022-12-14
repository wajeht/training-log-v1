const path = require('path');
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
    port: process.env.DB_PORT,
  },
  port: {
    serverPort: process.env.PORT,
  },
  cookie: {
    secret: process.env.COOKIE_SECRET,
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth_user: process.env.EMAIL_AUTH_USER,
    auth_pass: process.env.EMAIL_AUTH_PASS,
  },
  isProd: process.env.NODE_ENV,
};

module.exports = config;
