const Video = require('../models/video.js');
const comments = [];

// ---------- VIDEO ----------
exports.getVideo = (req, res, next) => {
    const id = req.params.id;

    Video.findById(id)
        .then((video) => {
            console.log({ '***** adminController.getVideo ***** ': video });
            res.render('video/video-details.ejs', {
                video: video,
                pageTitle: video.title,
                comments: comments,
                isAuthenticated: req.session.user,
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    console.log({ '***** adminController.getAddVideo ***** ': '' });
    res.render('video/add-video.ejs', {
        pageTitle: 'add video page',
        isAuthenticated: req.session.user,
    });
};

exports.postAddVideo = (req, res, next) => {
    const { date, videoUrl, title, message } = req.body;

    Video.addVideo(date, videoUrl, title, message)
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
                isAuthenticated: req.session.user,
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
