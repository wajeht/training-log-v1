/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns login.ejs
 */
module.exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};
