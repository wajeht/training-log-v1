const comments = [];
const videos = [];

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

exports.getVideoDetails = (req, res, next) => {
    res.render('video-details.ejs', {
        pageTitle: 'video-details',
        comments: comments,
    });
    console.log({ comments: comments });
};

exports.getAddVideo = (req, res, next) => {
    res.render('add-video.ejs');
};

exports.postAddVideo = (req, res, next) => {
    const data = {
        date: req.body.date,
        title: req.body.title,
        message: req.body.message,
    };
    videos.push(data);
    console.log({ videos: videos });
    res.redirect('/');
};

exports.postAddComment = (req, res, next) => {
    const data = {
        name: req.body.name,
        message: req.body.message,
    };
    comments.push(data);
    res.redirect('/video-details');
};
