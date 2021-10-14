// Utils
const fs = require('fs');
const path = require('path');
const { root } = require('../../util/directory.js');

// Screenshot
const ffmpeg = require('fluent-ffmpeg');

// Models
const Comment = require('../models/comments.js');
const Video = require('../models/video.js');
const User = require('../models/user.js');

// ---------- VIDEO ----------
exports.getVideo = async (req, res, next) => {
  const { id } = req.params;

  let currentSessionUser = null;
  let currentSessionUserId = null;
  var profilePicture = null;

  if (req.session.user) {
    currentSessionUser = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  } else {
    currentSessionUser = null;
  }

  Video.findById(id)
    .then((video) => {
      if (video == undefined) {
        res.setStatus = 404;
        return res.render('404.ejs', {
          pageTitle: '404',
          isAuthenticated: false,
        });
      }

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
              username: currentSessionUser,
              userID: user.id,
              video,
              date,
              videosArray: thisWeekVideoArray,
              pageTitle: `${user.username}'s ${video.title}`,
              comments: result,
              author: user.username,
              profilePicture,
              currentSessionUser,
            });
          });
        });
      });
    })
    .catch((err) => next(err));
};

exports.getAddVideo = async (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  }
  try {
    res.render('video/add-video.ejs', {
      pageTitle: 'add video page',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddVideo = (req, res, next) => {
  try {
    let { date, title, message } = req.body;
    const userId = req.session.user.id;
    const video = req.files.video[0];

    message = message.replace(/<br>/g, 'chr(10)');

    if (!video) {
      return Error('no');
    }

    const videoUrl = video.path;
    const videoUrlForScreenShot = path.join(root, videoUrl);
    const screenShotFolderPath = path.join(
      root,
      'data',
      'uploads',
      'thumbnails'
    );

    // take screenshot at the 0 second then save it at uploads/thumbnails
    ffmpeg(videoUrlForScreenShot).screenshots({
      timestamps: [0],
      folder: screenShotFolderPath,
      filename: videoUrl.split('/').pop().concat('_screenshot.jpg'),
      size: '640x640',
    });

    const fn = videoUrl.split('/').pop().concat('_screenshot.jpg');
    const screenshotUrl = path.join('data', 'uploads', 'thumbnails', fn);

    // optimize the image
    (async () => {
      const imagemin = (await import('imagemin')).default;
      const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;

      await imagemin([screenshotUrl], screenShotFolderPath, {
        use: [imageminMozjpeg()],
      });
    })();

    Video.addVideo(date, videoUrl, screenshotUrl, title, message, userId)
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.postUpdateVideo = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, message } = req.body;
  const videoUpload = req.files.video;

  // if user has sleeted a video to swap delete old vid, then replace with new vid
  if (videoUpload != null || videoUpload != undefined) {
    Video.findById(id)
      .then((oldVideo) => {
        const video = req.files.video[0];

        const oldVideoArray = [oldVideo.videoUrl, oldVideo.screenshotUrl];

        // delete old video
        for (let file of oldVideoArray) {
          fs.unlink(file, (err) => {
            if (err) return next(err);
          });
        }

        const videoUrl = video.path;
        const videoUrlForScreenShot = path.join(root, videoUrl);
        const screenShotFolderPath = path.join(
          root,
          'data',
          'uploads',
          'thumbnails'
        );

        // take screenshot at the 0 second then save it at uploads/thumbnails
        ffmpeg(videoUrlForScreenShot).screenshots({
          timestamps: [0],
          folder: screenShotFolderPath,
          filename: videoUrl.split('/').pop().concat('_screenshot.jpg'),
          size: '640x640',
        });

        const fn = videoUrl.split('/').pop().concat('_screenshot.jpg');
        const newScreenshotUrl = path.join('data', 'uploads', 'thumbnails', fn);

        // optimize the image
        (async () => {
          const imagemin = (await import('imagemin')).default;
          const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;

          await imagemin([newScreenshotUrl], screenShotFolderPath, {
            use: [imageminMozjpeg()],
          });
        })();

        // update new video
        Video.update(videoUrl, newScreenshotUrl, title, message, id).then(() =>
          res.redirect(`/video/${id}`)
        );
      })
      .catch((err) => console.log(err));
  } else {
    // if user didn't choose video
    Video.findById(id)
      .then((oldVideo) => {
        const { videoUrl, screenshotUrl } = oldVideo;

        Video.update(videoUrl, screenshotUrl, title, message, id).then(() =>
          res.redirect(`/video/${id}`)
        );
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.postEditVideo = async (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  }

  const id = parseInt(req.params.id);
  Video.findById(id)
    .then((result) => {
      res.render('video/edit-video.ejs', {
        username,
        videoArray: result,
        pageTitle: 'edit videos',
        currentSessionUserId,
        profilePicture,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDeleteVideo = (req, res, next) => {
  const id = parseInt(req.params.id);

  Comment.fetchComment(id)
    .then((comment) => comment.length > 0)
    .then((hasComments) => {
      if (hasComments) {
        // delete comment
        Comment.deleteCommentByVideoId(id)
          .then(() => {
            // delete video
            Video.delete(id).then((deletedVideo) => {
              const { videoUrl, screenshotUrl } = deletedVideo;

              fs.unlink(videoUrl, (err) => {
                if (err) return console.log(err);
              });
              fs.unlink(screenshotUrl, (err) => {
                if (err) return console.log(err);
              });

              return res.redirect('/');
            });
          })
          .catch((err) => {
            next(err);
          });
      }
      // else just delete video
      Video.delete(id).then((deletedVideo) => {
        const { videoUrl, screenshotUrl } = deletedVideo;

        fs.unlink(videoUrl, (err) => {
          if (err) return console.log(err);
        });
        fs.unlink(screenshotUrl, (err) => {
          if (err) return console.log(err);
        });

        return res.redirect('/');
      });
    })
    .catch((err) => {
      next(err);
    });
};

// ---------- MY VIDEO ----------
exports.getMyVideos = async (req, res, next) => {
  let currentSessionUserId = null;
  let profilePicture = null;

  if (req.session.user) {
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  }

  Video.fetchUserVideo(req.session.user.id)
    .then((videos) =>
      res.render('video/my-videos.ejs', {
        videos,
        username: req.session.user.username,
        pageTitle: `${req.session.user.username}'s videos`,
        currentSessionUserId: req.session.user.id,
        profilePicture,
      })
    )
    .catch((err) => {
      next(err);
    });
};

exports.getCommentUserVideos = async (req, res, next) => {
  const { userId } = req.params;
  let currentSessionUserId = null;
  let profilePicture = null;

  if (req.session.user) {
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  }

  Video.fetchUserVideo(userId)
    .then((videos) => {
      User.findById(userId).then((user) =>
        res.render('video/my-videos.ejs', {
          videos,
          username: user.username,
          pageTitle: `${user.username}'s videos`,
          currentSessionUserId: user.id,
          profilePicture,
        })
      );
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPostAutherVideos = async (req, res, next) => {
  const userId = req.params.username;
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    const { profilePictureUrl } = await User.findById(currentSessionUserId);
    profilePicture = profilePictureUrl;
  }

  Video.fetchUserVideo(userId)
    .then((videos) => {
      User.findById(userId).then((user) => {
        res.render('video/my-videos.ejs', {
          videos,
          postAuthor: user.username,
          username,
          pageTitle: `${user.username}'s videos`,
          currentSessionUserId: user.id,
          profilePicture,
        });
      });
    })
    .catch((err) => {
      next(err);
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
    .then(() => {
      res.redirect(`/video/${videoId}`);
    })
    .catch((err) => {
      next(err);
    });
};
