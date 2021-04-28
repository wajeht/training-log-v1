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
    // console.log(id);

    // impliment way to get data out of database
    // Video.findById(id)
    //     .then(([video]) => {
    //         res.render('video-details.ejs', {
    //             video: video[0],
    //             pageTitle: video.title,
    //             comments: comments,
    //         });
    //     })
    //     .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    res.render('add-video.ejs');
};

exports.postAddVideo = (req, res, next) => {
    const data = {
        date: req.body.date,
        videoUrl: req.body.videoUrl,
        title: req.body.title,
        message: req.body.message,
    };

    // impliment logic to save into databae
};

exports.postAddComment = (req, res, next) => {
    const data = {
        name: req.body.name,
        message: req.body.message,
    };
    comments.push(data);
    res.redirect('/video-details');
};
