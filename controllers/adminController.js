const Video = require('../models/video.js');
const comments = [];

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

exports.getVideo = (req, res, next) => {
    const id = req.params.id;

    Video.findById(id)
        .then((video) => {
            console.log({ 'adminController.getVideo': video });
            res.render('video-details.ejs', {
                video: video,
                pageTitle: video.title,
                comments: comments,
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    res.render('add-video.ejs');
};

exports.postAddVideo = (req, res, next) => {
    const { date, videoUrl, title, message, userId } = req.body;
    const random = Math.floor(Math.random() * 1000);

    Video.addVideo(random, date, videoUrl, title, message, random)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postAddComment = (req, res, next) => {
    const data = {
        name: req.body.name,
        message: req.body.message,
    };
    comments.push(data);
    res.redirect('/video-details');
};
