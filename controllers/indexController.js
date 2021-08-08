const Video = require('../models/video.js');

const ITEMS_PER_PAGE = 16;

exports.getIndex = async (req, res, next) => {
    let username = null;
    let currentSessionUserId = null;
    const page = +req.query.page || 1;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    try {
        const res_countAllVideo = await Video.countAllVideos();
        let totalVideos = await res_countAllVideo.count;

        const res_fetchAll = await Video.fetchAll(ITEMS_PER_PAGE, page);
        const videosArray = await res_fetchAll;

        return res.render('index.ejs', {
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
    } catch (err) {
        next(err.message);
    }
};
