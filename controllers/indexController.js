const Video = require('../models/video.js');

const ITEMS_PER_PAGE = 16;

exports.getIndex = (req, res, next) => {
    let username = null;
    let currentSessionUserId = null;
    let totalVideos;
    const page = +req.query.page || 1;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    Video.countAllVideos()
        .then((result) => {
            totalVideos = Number(result.count);
            Video.fetchAll(ITEMS_PER_PAGE, page).then((videosArray) => {
                res.render('index.ejs', {
                    username: username,
                    videosArray: videosArray,
                    pageTitle: 'Home',
                    currentPage: page,
                    hasNextPage: ITEMS_PER_PAGE * page < totalVideos,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalVideos / ITEMS_PER_PAGE),
                    isAuthenticated: req.session.isLoggedIn,
                    currentSessionUserId: currentSessionUserId,
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
