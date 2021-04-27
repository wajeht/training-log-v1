const Video = require('../models/video.js');

exports.getIndex = (req, res, next) => {
    Video.fetchFall()
        .then(([videosArray]) => {
            // console.log(videosArray);
            res.render('index.ejs', {
                pageTitle: 'index',
                videosArray: videosArray,
            });
        })
        .catch((err) => console.log(err));
};
