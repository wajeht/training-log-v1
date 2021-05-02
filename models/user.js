const pool = require('../config/database.js');

module.exports = class User {
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE email=($1)', [email], (err, response) => {
                if (err) return reject(err);
                resolve(response.rows[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE id=($1)', [id], (err, response) => {
                if (err) return reject(err);
                resolve(response.rows[0]);
            });
        });
    }

    static addUser(email, username, password) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *',
                [email, username, password],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
