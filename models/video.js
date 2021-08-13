const { response } = require('express');
const pool = require('../config/database.js');

// SELECT * FROM items LIMIT {itemsPerPage} OFFSET {(page - 1) * itemsPerPage}
// https://stackoverflow.com/questions/48298555/how-to-implement-pagination-in-nodejs-postgresql
https: module.exports = class Video {
    static fetchAll(itemsPerPage, page) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM videos ORDER BY id DESC LIMIT ($1) OFFSET (($2) -1) * ($1)',
                [itemsPerPage, page],
                (error, response) => {
                    if (error) return reject(error);
                    resolve(response.rows);
                }
            );
        });
    }

    static countAllVideos() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT COUNT(*) from videos', (error, response) => {
                if (error) return reject(error);
                resolve(response.rows[0]);
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
            pool.query('DELETE FROM videos where id=($1) RETURNING *', [id], (err, response) => {
                if (err) return reject(err);
                resolve(response.rows[0]);
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

    static fetchUserVideo(userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM videos where "userId"=($1) ORDER BY id DESC',
                [userId],
                (err, response) => {
                    if (err) return reject(err);
                    resolve(response.rows);
                }
            );
        });
    }

    static addVideo(date, videoUrl, screenshotUrl, title, message, userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO videos (date, "videoUrl", "screenshotUrl", title, message, "userId") VALUES ($1, $2, $3, $4, $5, $6)',
                [date, videoUrl, screenshotUrl, title, message, userId],
                (error, response) => {
                    if (error) return reject(error);
                    resolve(response.rows[0]);
                }
            );
        });
    }
};
