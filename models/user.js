const { response } = require('express');
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

    static updateProfilePicture(profilePictureUrl, userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE users SET "profilePictureUrl"=($1) WHERE id =($2) RETURNING *',
                [profilePictureUrl, userId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }

    static updateToken(userId, resetToken, resetTokenExpiration) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE users SET "resetToken"=($2), "resetTokenExpiration"=($3) WHERE id = ($1) RETURNING *',
                [userId, resetToken, resetTokenExpiration],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }

    static findResetTokenInfo(resetToken) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM users where "resetToken" = ($1)',
                [resetToken],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }

    static deletePasswordResetTokenInfo(userId) {
        return new Promise((reject, resolve) => {
            pool.query(
                'UPDATE users SET "resetToken"=null, "resetTokenExpiration"=null where id = ($1) RETURNING *',
                [userId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }

    static updatePasswordByToken(password, resetToken) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE users SET password=($1) WHERE "resetToken"=($2) RETURNING *',
                [password, resetToken],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
