const { isProd } = require('../../config/config.js');
/**
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns 404.ejs page
 */
exports.get404 = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;
  let isAuthenticated = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
      isAuthenticated = req.session.isLoggedIn;
    }

    res.setStatus = 404;
    return res.render('404.ejs', {
      username,
      currentSessionUserId,
      pageTitle: '404',
      isAuthenticated,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns 500.ejs
 */
exports.get500 = (err, req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;
  let isAuthenticated = null;

  console.log(req.session);

  try {
    if (req.session != null) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
      isAuthenticated = req.session.isLoggedIn;
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // const e = {
    //   status: err.status,
    //   name: err.name,
    //   path: err.path,
    //   errors: err.errors,
    //   message: err.message,
    //   stack: err.stack,
    // };

    const error = {
      message: isProd == 'dev' ? err.message : 'Internal Server Error',
      stack:
        isProd == 'dev'
          ? err.stack
          : 'Something went wrong, please contact us immediately',
    };

    res.status(statusCode);
    return res.render('500.ejs', {
      username,
      currentSessionUserId,
      pageTitle: '500',
      isAuthenticated,
      profilePicture,
      error,
    });
  } catch (err) {
    next(err);
  }
};
