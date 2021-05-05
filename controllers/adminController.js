const Video = require('../models/video.js');
const User = require('../models/user.js');
const comments = [];

// ---------- VIDEO ----------
exports.getVideo = (req, res, next) => {
    const { id } = req.params;

    let username = null;
    if (req.session.user) {
        username = req.session.user.username;
    }

    let currentSessionUser = null;

    if (req.session.user) {
        currentSessionUser = req.session.user.username;
    } else {
        currentSessionUser = null;
    }

    Video.findById(id)
        .then((video) => {
            if (video == undefined) {
                // console.log({ 404: ' ##### adminController.getVideo (404) #####' });
                res.setStatus = 404;
                return res.render('404.ejs', {
                    pageTitle: '404',
                    isAuthenticated: false,
                });
            }
            // console.log({ '***** adminController.getVideo ***** ': video });

            // to render post author info
            User.findById(video.userId).then((user) => {
                // const date = video.date.toString().split(' ').slice(1, 4).toLocalDateString();
                const date = new Date(video.date.toString()).toLocaleDateString();

                res.render('video/video-details.ejs', {
                    username: username,
                    video: video,
                    date: date,
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
    let username = null;
    if (req.session.user) {
        username = req.session.user.username;
    }
    // console.log({ '***** adminController.getAddVideo ***** ': '' });
    res.render('video/add-video.ejs', {
        pageTitle: 'add video page',
        username: username,
    });
};

exports.postAddVideo = (req, res, next) => {
    const { date, videoUrl, title, message } = req.body;
    const userId = req.session.user.id;

    Video.addVideo(date, videoUrl, title, message, userId)
        .then(() => {
            // console.log({ '***** adminController.postAddVideo ***** ': req.body });
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
    let username = null;
    if (req.session.user) {
        username = req.session.user.username;
    }

    const id = parseInt(req.params.id);
    Video.findById(id)
        .then((result) => {
            // console.log({ '***** adminController.postEditVideo ***** ': result });
            res.render('video/edit-video.ejs', {
                username: username,
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
