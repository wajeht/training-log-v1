const comments = [];

exports.getVideoDetails = (req, res, next) => {
    res.render('video-details.ejs', {
        pageTitle: 'video-details',
        comments: comments,
    });

    console.log(comments);
};

exports.getAddVideo = (req, res, next) => {
    res.render('add-video.ejs');
};

exports.postAddVideo = (req, res, next) => {
    const data = {
        video: req.body.video,
        date: req.body.date,
        title: req.body.title,
        message: req.body.message,
    };

    console.log(data);

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
