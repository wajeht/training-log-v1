const Video = require('../models/video.js');

exports.getIndex = (req, res, next) => {
    Video.fetchAll()
        .then((result) => {
            res.render('index.ejs', {
                videosArray: result,
                pageTitle: 'index',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
