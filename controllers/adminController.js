const Video = require('../models/video.js');
const comments = [];

// ---------- AUTH ----------
exports.getLogin = (req, res, nexdt) => {
    res.render('login.ejs');
};

exports.postLogin = (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    };
    console.log({ login: data });
    res.redirect('/');
};

exports.getSignup = (req, res, next) => {
    res.render('signup.ejs');
};

exports.getForgotPassword = (req, res, next) => {
    res.render('forgot-password.ejs');
};

// ---------- VIDEO ----------
exports.getVideo = (req, res, next) => {
    const id = req.params.id;

    Video.findById(id)
        .then((video) => {
            console.log({ '***** adminController.getVideo ***** ': video });
            res.render('video-details.ejs', {
                video: video,
                pageTitle: video.title,
                comments: comments,
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    console.log({ '***** adminController.getAddVideo ***** ': '' });
    res.render('add-video.ejs', {
        pageTitle: 'add video page',
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
            res.render('edit-video.ejs', {
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
