exports.getVideoDetails = (req, res, next) => {
    res.render('video-details.ejs');
};

exports.getAddVideo = (req, res, next) => {
    res.render('add-video.ejs');
};

exports.postAddVideo = (req, res, next) => {
    const data = {
        title: req.body.title,
        message: req.body.message,
    };

    console.log(data);

    res.redirect('/');
};
