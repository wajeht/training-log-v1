const Video = require('../models/video.js');

exports.getIndex = (req, res, next) => {
    let username = null;
    if (req.session.user) {
        username = req.session.user.username;
    }

    Video.fetchAll()
        .then((videosArray) => {
            console.log({ '***** indexController.getIndex *****': videosArray });
            res.render('index.ejs', {
                username: username,
                videosArray: videosArray,
                pageTitle: 'Home',
                isAuthenticated: req.session.isLoggedIn,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
