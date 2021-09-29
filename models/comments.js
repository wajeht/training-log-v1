const pool = require('../config/database.js');

module.exports = class Comment {
  /**
   * @param {date} date
   * @param {string} comment
   * @param {number} videoId
   * @param {number} userId
   * @returns list of comments with newly created comment
   */
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

  /**
   * get a list of comments in acceding order based on video id
   * @param {number} videoId
   * @returns {array[]} a list of comments
   */
  static fetchComment(videoId) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT*FROM"comments" INNER JOIN users ON users.id="userId" where "videoId" = ($1) ORDER BY "comments".date ASC',
        [videoId],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows);
        }
      );
    });
  }

  /**
   * @param {date} date
   * @param {string} comment
   * @param {number} videoId
   * @param {number} userId
   * @returns old comments with newly inserted comment
   */
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

  /**
   * @param {number} videoId
   * @returns list of comments without the one being deleted
   */
  static deleteCommentByVideoId(videoId) {
    return new Promise((reject, resolve) => {
      pool.query(
        'DELETE FROM comments WHERE "videoId" = ($1) RETURNING *',
        [videoId],
        (err, response) => {
          if (err) return reject(err);
          resolve(response.rows[0]);
        }
      );
    });
  }
};
