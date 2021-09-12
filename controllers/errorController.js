exports.get404 = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;
  let isAuthenticated = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    profilePicture = req.session.user.profilePictureUrl;
    isAuthenticated = req.session.isLoggedIn;
  }

  res.setStatus = 404;
  res.render('404.ejs', {
    username,
    currentSessionUserId,
    pageTitle: '404',
    isAuthenticated: req.session.isLoggedIn,
    profilePicture,
  });
};

exports.get500 = (err, req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;
  let isAuthenticated = null;

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const error = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? err.message : err.stack,
  };

  res.status(statusCode);

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    profilePicture = req.session.user.profilePictureUrl;
    isAuthenticated = req.session.isLoggedIn;
  }

  res.render('500.ejs', {
    username,
    currentSessionUserId,
    pageTitle: '500',
    isAuthenticated,
    profilePicture,
    error,
  });
};
