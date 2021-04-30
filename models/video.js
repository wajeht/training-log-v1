const pool = require('../config/database.js');
module.exports = class Video {
    static fetchAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM videos', (error, response) => {
                if (error) return reject(error);

                resolve(response.rows);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM videos WHERE id = ($1)', [id], (error, response) => {
                if (error) return reject(error);
                resolve(response.rows[0]);
            });
        });
    }

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM videos where id = ($1)', [id], (err, response) => {
                if (err) reject(err);
                resolve(response.rows);
            });
        });
    }

    static addVideo(id, date, videourl, title, message, userid) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO videos (id, date, videourl, title, message, userid) VALUES ($1, $2, $3, $4, $5, $6)',
                [id, date, videourl, title, message, userid],
                (error, response) => {
                    if (error) return reject(error);
                    console.log(response);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
