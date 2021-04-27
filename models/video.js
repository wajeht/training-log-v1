const db = require('../util/database.js');

module.exports = class Video {
    constructor(id, date, title, message, videoUrl) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.message = message;
        this.videoUrl = videoUrl;
    }

    save() {
        return db.execute(
            'INSERT INTO videos (date, title, message, videoUrl) VALUES (?, ?, ?, ?)',
            [this.date, this.title, this.message, this.videoUrl]
        );
    }

    static deleteById() {}

    static findById(id) {
        return db.execute('SELECT * FROM videos WHERE videos.id = ?', [id]);
    }

    static fetchFall() {
        return db.execute('SELECT * FROM videos');
    }
};
