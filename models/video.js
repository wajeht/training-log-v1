const pool = require('../config/database.js');
module.exports = class Video {
    static async fetchAll() {
        try {
            const { rows } = await pool.query('SELECT * FROM videos');
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    static findById() {
        // TODO: fid by id stuff ehre
    }

    static addVideo() {
        // TODO: add video suff ehre
    }
};
