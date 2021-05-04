const Video = require('../models/video.js');
const User = require('../models/user.js');
const comments = [];

// ---------- VIDEO ----------
exports.getVideo = (req, res, next) => {
    const { id } = req.params;

    let currentSessionUser = null;

    if (req.session.user) {
        currentSessionUser = req.session.user.username;
    } else {
        currentSessionUser = null;
    }

    Video.findById(id)
        .then((video) => {
            if (video == undefined) {
                console.log({ 404: ' ##### adminController.getVideo (404) #####' });
                res.setStatus = 404;
                return res.render('404.ejs', {
                    pageTitle: '404',
                    isAuthenticated: false,
                });
            }
            console.log({ '***** adminController.getVideo ***** ': video });

            // to render post author info
            User.findById(video.userId).then((user) => {
                res.render('video/video-details.ejs', {
                    video: video,
                    pageTitle: `Video ${id}: ${video.title}`,
                    comments: comments,
                    author: user.username,
                    currentSessionUser: currentSessionUser,
                });
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    console.log({ '***** adminController.getAddVideo ***** ': '' });
    res.render('video/add-video.ejs', {
        pageTitle: 'add video page',
    });
};

exports.postAddVideo = (req, res, next) => {
    const { date, videoUrl, title, message } = req.body;
    const userId = req.session.user.id;

    Video.addVideo(date, videoUrl, title, message, userId)
        .then(() => {
            console.log({ '***** adminController.postAddVideo ***** ': req.body });
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postUpdateVideo = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { videoUrl, title, message } = req.body;

    Video.update(videoUrl, title, message, id)
        .then(() => {
            res.redirect(`/video/${id}`);
        })
        .catch((err) => console.log(err));
};

exports.postEditVideo = (req, res, next) => {
    const id = parseInt(req.params.id);
    Video.findById(id)
        .then((result) => {
            console.log({ '***** adminController.postEditVideo ***** ': result });
            res.render('video/edit-video.ejs', {
                videoArray: result,
                pageTitle: 'edit videos',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteVideo = (req, res, next) => {
    const id = parseInt(req.params.id);
    Video.delete(id)
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

// ---------- COMMENT ----------
exports.postAddComment = (req, res, next) => {
    const data = {
        name: req.body.name,
        message: req.body.message,
    };
    comments.push(data);
    res.redirect('/video-details');
};
