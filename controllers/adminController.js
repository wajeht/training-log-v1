// Utils
const fs = require('fs');
const path = require('path');
const { root } = require('../util/directory.js');

// Screenshot
const ffmpeg = require('fluent-ffmpeg');

// Models
const Comment = require('../models/comments.js');
const Video = require('../models/video.js');
const User = require('../models/user.js');

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
                    Video.fetchUserVideo(video.userId).then((videosArray) => {
                        const thisWeekVideoArray = videosArray.slice(1, 4);

                        return res.render('video/video-details.ejs', {
                            postAuthorId: user.id,
                            videoUserProfileUrl: user.profilePictureUrl,
                            currentSessionUserId,
                            videId: video.id,
                            username: user.username,
							userID: user.id,
                            video,
                            date,
                            videosArray: thisWeekVideoArray,
                            pageTitle: `${user.username}'s ${video.title}`,
                            comments: result,
                            author: user.username,
                            currentSessionUser,
                        });
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
        username,
        currentSessionUserId,
    });
};

exports.postAddVideo = (req, res, next) => {
    let { date, title, message } = req.body;
    const userId = req.session.user.id;
    const video = req.files.video[0];

    message = message.replace(/<br>/g, 'chr(10)');

    // console.log('########## VIDEO ######', video);
    if (!video) {
        return Error('no');
    }

    const videoUrl = video.path;
    const videoUrlForScreenShot = path.join(root, videoUrl);
    const screenShotFolderPath = path.join(root, 'public', 'uploads', 'thumbnails');

    // take screenshot at the 0 second then save it at uploads/thumbnails
    ffmpeg(videoUrlForScreenShot).screenshots({
        timestamps: [0],
        folder: screenShotFolderPath,
        filename: videoUrl.split('/').pop().concat('_screenshot.jpg'),
        size: '640x640',
    });

    const fn = videoUrl.split('/').pop().concat('_screenshot.jpg');
    const screenshotUrl = path.join('public', 'uploads', 'thumbnails', fn);

    // optimize the image
    (async () => {
        const imagemin = (await import('imagemin')).default;
        const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;

        await imagemin([screenshotUrl], screenShotFolderPath, {
            use: [imageminMozjpeg()],
        });

        // console.log('Images optimized');
    })();

    Video.addVideo(date, videoUrl, screenshotUrl, title, message, userId)
        .then(() => {
            // console.log({
            //     '***** adminController.postAddVideo ***** ': req.body,
            //     screenshotUrl,
            // });
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postUpdateVideo = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, message } = req.body;
    const videoUpload = req.files.video;

    // if user has sleeted a video to swap
    // delete old vid, then replace with new vid
    if (videoUpload != null || videoUpload != undefined) {
        Video.findById(id)
            .then((result) => {
                const { path } = req.files.video[0];
                const oldVideoPath = result.videoUrl;

                // delete old video
                fs.unlink(oldVideoPath, (err) => {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });

                // update new view
                Video.update(path, title, message, id).then(() => res.redirect(`/video/${id}`));
            })
            .catch((err) => console.log(err));
    } else {
        // if user didn't choose video
        Video.findById(id)
            .then((result) => {
                console.log(result);
                const { videoUrl } = result;

                Video.update(videoUrl, title, message, id).then(() => res.redirect(`/video/${id}`));
            })
            .catch((err) => console.log(err));
    }
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
                username,
                videoArray: result,
                pageTitle: 'edit videos',
                currentSessionUserId,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteVideo = (req, res, next) => {
    const id = parseInt(req.params.id);

    Comment.fetchComment(id)
        .then((comment) => comment.length > 0)
        .then((hasComments) => {
            // if vid has comment
            // delete comment fist
            // then delete video
            if (hasComments) {
                // delete comment
                Comment.deleteCommentByVideoId(id)
                    .then(() => {
                        // delete video
                        Video.delete(id).then((deletedVideo) => {
                            console.log('deletedVideo', deletedVideo);

                            const { videoUrl } = deletedVideo;

                            fs.unlink(videoUrl, (err) => {
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
            // else just delete video
            Video.delete(id).then((deletedVideo) => {
                console.log('deletedVideo', deletedVideo);

                const { videoUrl } = deletedVideo;

                fs.unlink(videoUrl, (err) => {
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
        .then((videos) =>
            res.render('video/my-videos.ejs', {
                videos,
                username: req.session.user.username,
                pageTitle: `${req.session.user.username}'s videos`,
                currentSessionUserId: req.session.user.id,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

exports.getCommentUserVideos = (req, res, next) => {
    const { userId } = req.params;

    Video.fetchUserVideo(userId)
        .then((videos) => {
            User.findById(userId).then((user) =>
                res.render('video/my-videos.ejs', {
                    videos,
                    username: user.username,
                    pageTitle: `${user.username}'s videos`,
                    currentSessionUserId: user.id,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPostAutherVideos = (req, res, next) => {
    const userId = req.params.username;

    Video.fetchUserVideo(userId)
        .then((videos) => {
            User.findById(userId).then((user) =>
                res.render('video/my-videos.ejs', {
                    videos,
                    username: user.username,
                    pageTitle: `${user.username}'s videos`,
                    currentSessionUserId: user.id,
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

// ---------- COMMENT ----------
exports.postAddComment = (req, res, next) => {
    const date = new Date();
    let { message, videoId, userId } = req.body;

    // had to turn into number because
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
