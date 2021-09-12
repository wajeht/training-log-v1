exports.get404 = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  const page = +req.query.page || 1;
  let profilePicture = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    profilePicture = req.session.user.profilePictureUrl;
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
