const pool = require('../config/database.js');
module.exports = class Video {
    static fetchAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM videos ORDER BY id DESC', (error, response) => {
                if (error) return reject(error);
                resolve(response.rows);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM videos WHERE id=($1)', [id], (error, response) => {
                if (error) return reject(error);
                resolve(response.rows[0]);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM videos where id=($1)', [id], (err, response) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    static update(videoUrl, title, message, id) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE videos SET "videoUrl"=($1), title=($2), message=($3) where id=($4)',
                [videoUrl, title, message, id],
                (err, response) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }

    static addVideo(date, videoUrl, title, message) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO videos (date, "videoUrl", title, message) VALUES ($1, $2, $3, $4)',
                [date, videoUrl, title, message],
                (error, response) => {
                    if (error) return reject(error);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
