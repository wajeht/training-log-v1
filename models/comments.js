const pool = require('../config/database.js');

module.exports = class Comment {
    static addComment(date, comment, videoId, userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO comments (date, comment, "videoId", "userId") VALUES ($1, $2, $3, $4) RETURNING *',
                [date, comment, videoId, userId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }

    static fetchComment(videoId) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT*FROM"comments" INNER JOIN users ON users.id="userId" where "videoId" = ($1) ORDER BY "comments".id DESC',
                [videoId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows);
                }
            );
        });
    }

    static insertComment(date, comment, videoId, userId) {
        return new Promise((reject, resolve) => {
            pool.query(
                'INSERT INTO comments (date, comment, "videoId", "userId") VALUES ($1, $2, $3, $4) RETURNING *',
                [date, comment, videoId, userId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
