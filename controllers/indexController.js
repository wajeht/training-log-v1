const Video = require('../models/video.js');

exports.getIndex = (req, res, next) => {
    Video.fetchAll()
        .then((videosArray) => {
            console.log({ '***** indexController.getIndex *****': videosArray });
            res.render('index.ejs', {
                videosArray: videosArray,
                pageTitle: 'index',
                isAuthenticated: req.isLoggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
