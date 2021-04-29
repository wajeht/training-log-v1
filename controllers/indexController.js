const Video = require('../models/video.js');

exports.getIndex = (req, res, next) => {
    Video.fetchAll()
        .then((videosArray) => {
            res.render('index.ejs', {
                videosArray: videosArray,
                pageTitle: 'index',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
