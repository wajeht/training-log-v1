/**
 * if user isn't logged in and visit certain routes this
 * middle ware function will keep redirect into login page
 * @param {object} req request
 * @param {object} res response
 * @param {object} next next middleware
 * @returns login.ejs page
 */
module.exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};
