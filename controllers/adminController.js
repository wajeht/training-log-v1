const Video = require('../models/video.js');
const User = require('../models/user.js');
const Comment = require('../models/comments.js');
const fs = require('fs');

// ---------- VIDEO ----------
exports.getVideo = (req, res, next) => {
    const { id } = req.params;

    let username = null;
    let currentSessionUser = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUser = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    } else {
        currentSessionUser = null;
        username = null;
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

                // fetch comment
                Comment.fetchComment(video.id).then((result) => {
                    return res.render('video/video-details.ejs', {
                        postAuthorId: user.id,
                        videoUserProfileUrl: user.profilePictureUrl,
                        currentSessionUserId: currentSessionUserId,
                        videId: video.id,
                        username: username,
                        video: video,
                        date: date,
                        pageTitle: `${user.username}'s ${video.title}`,
                        comments: result,
                        author: user.username,
                        currentSessionUser: currentSessionUser,
                    });
                });
            });
        })
        .catch((err) => console.log(err));
};

exports.getAddVideo = (req, res, next) => {
    let username = null;
    let currentSessionUserId = null;
    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }
    // console.log({ '***** adminController.getAddVideo ***** ': '' });
    res.render('video/add-video.ejs', {
        pageTitle: 'add video page',
        username: username,
        currentSessionUserId: currentSessionUserId,
    });
};

exports.postAddVideo = (req, res, next) => {
    let { date, title, message } = req.body;
    const userId = req.session.user.id;
    const video = req.files.video[0];

    message = message.replaceAll('<br>', 'chr(10)');

    console.log('########## VIIDEO ######', video);
    if (!video) {
        return Error('no');
    }

    const videoUrl = video.path;

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
    let currentSessionUserId = null;
    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    const id = parseInt(req.params.id);
    Video.findById(id)
        .then((result) => {
            // console.log({ '***** adminController.postEditVideo ***** ': result });
            res.render('video/edit-video.ejs', {
                username: username,
                videoArray: result,
                pageTitle: 'edit videos',
                currentSessionUserId: currentSessionUserId,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteVideo = (req, res, next) => {
    const id = parseInt(req.params.id);

    Comment.fetchComment(id)
        .then((comment) => {
            return comment.length > 0;
        })
        .then((hasComments) => {
            // if vid has comment
            // delete comment fist
            // then delte video
            if (hasComments) {
                // delete comment
                Comment.deleteCommentByVideoId(id)
                    .then(() => {
                        // delete video
                        Video.delete(id).then((deletedVideo) => {
                            console.log('deletedVideo', deletedVideo);

                            const { videoUrl } = deletedVideo;

                            fs.unlink(videoUrl, function (err) {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });

                            return res.redirect('/');
                        });
                    })
                    .catch((err) => {
                        console.log('deletedCommentErr', err);
                    });
            }
            // else jsut delte vieo
            Video.delete(id).then((deletedVideo) => {
                console.log('deletedVideo', deletedVideo);

                const { videoUrl } = deletedVideo;

                fs.unlink(videoUrl, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });

                return res.redirect('/');
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// ---------- MY VIDEO ----------
exports.getMyVideos = (req, res, next) => {
    Video.fetchUserVideo(req.session.user.id)
        .then((videos) => {
            return res.render('video/my-videos.ejs', {
                videos: videos,
                username: req.session.user.username,
                pageTitle: `${req.session.user.username}'s videos`,
                currentSessionUserId: req.session.user.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postPostAutherVideos = (req, res, next) => {
    const userId = Number(req.body.postAuthorId);
    Video.fetchUserVideo(userId)
        .then((videos) => {
            User.findById(userId).then((user) => {
                return res.render('video/my-videos.ejs', {
                    videos: videos,
                    username: user.username,
                    pageTitle: `${user.username}'s videos`,
                    currentSessionUserId: user.id,
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// ---------- COMMENT ----------
exports.postAddComment = (req, res, next) => {
    const date = new Date();
    let { message, videoId, userId } = req.body;

    // had to turn into number bcause
    // because req.body.useID was a string
    userId = Number(userId);

    Comment.addComment(date, message, videoId, userId)
        .then((result) => {
            res.redirect(`/video/${videoId}`);
        })
        .catch((err) => {
            console.log(err);
        });
};
