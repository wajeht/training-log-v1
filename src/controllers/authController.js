// Hash password
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Utils
const config = require('../../config/config.js');
const { validationResult } = require('express-validator');

// Model
const User = require('../models/user.js');

// Email
const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
const smtpConfig = {
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.auth_user,
    pass: config.email.auth_pass,
  },
};
const transporter = nodemailer.createTransport(smtpConfig);
// const transporter = nodemailer.createTransport(
//     sendGridTransport({
//         auth: {
//             api_key: config.sendGrid.apiKey,
//         },
//     })
// );

// ---------- LOGIN ----------
exports.getLogin = (req, res, next) => {
  //   const currentSessionUserId = null;
  try {
    if (req.session.user) {
      res.redirect('/');
    }

    res.render('auth/login.ejs', {
      pageTitle: 'Login',
      errorMessage: req.flash('error'),
      successMessage: req.flash('success'),
    });
  } catch (err) {
    next(err);
  }
};

// ---------- LOGOUT ----------
exports.postLogin = (req, res, next) => {
  const { password, email } = req.body;
  User.findByEmail(email)
    .then((user) => {
      if (user == null) {
        req.flash('error', 'user does not exist with that credentials');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'wrong email or password');
          res.redirect('/login');
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      res.redirect('/login');
      next(err);
    });
};

exports.postLogout = (req, res, next) => {
  try {
    delete req.session.user;
    req.session.isLoggedIn = false;
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

// ---------- SIGNUP ----------
exports.postSignup = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }

  const { email, username, password } = req.body;
  const errors = validationResult(req);
  const oldInput = {
    email,
    username,
    password,
  };

  // if we failed, render the same page again
  if (errors.array().length > 0) {
    return res.status(422).render('auth/signup.ejs', {
      pageTitle: 'Signup',
      errorMessage: errors.array(),
      oldInput,
    });
  }

  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      User.addUser(email, username, hashPassword).then(() =>
        res.redirect('/login')
      );
    })
    .then(() => {
      req.flash('success', 'You have successfully registered. Please Login!');
      return transporter.sendMail({
        to: email,
        from: `JAWSTRENGTH.COM <${config.sendGrid.fromEmail}>`,
        subject: 'You have successfully registered',
        html: `
				<h3>Hello ${username},</h3>
				<br>
				<p>You have successfully registered an account with us.</p>
				<p>Visit <a href='https://tvl.jawstrength.com/login'>https://tvl.jawstrength.com/login</a> to login!</p>
				<br>
				<p>Best,</p>
				<p>Jaw</p>
				`,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSignup = (req, res, next) => {
  const errorMessage = req.flash('error');
  try {
    if (req.session.user) {
      return res.redirect('/');
    }

    res.render('auth/signup.ejs', {
      pageTitle: 'Signup',
      errorMessage,
      oldInput: {},
    });
  } catch (err) {
    next(err);
  }
};

// ---------- FORGOT PASSWORD ----------
exports.getForgetPassword = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }

  try {
    res.render('auth/forget-password.ejs', {
      pageTitle: 'Forgot password?',
      errorMessage: req.flash('error'),
    });
  } catch (err) {
    next(err);
  }
};

exports.postForgetPassword = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }

  const { email } = req.body;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      next(err);
      return res.redirect('/forget-password');
    }
    const token = buffer.toString('hex');

    User.findByEmail(email)
      .then((user) => {
        if (!user) {
          req.flash('error', 'not user found with that email');
          return res.redirect('/forget-password');
        }

        const { id } = user;
        const resetToken = token;
        const resetTokenExpiration = new Date(new Date().getTime() + 5 * 60000);
        return User.updateToken(id, resetToken, resetTokenExpiration);
      })
      .then(() => {
        res.redirect('/');
        // return transporter.sendMail({
        //     to: email,
        //     from: config.sendGrid.fromEmail,
        //     subject: 'Password reset',
        //     html: `
        //     <p>You requested a password reset</p>
        //     <p>Click <b><i><a href="http://localhost:3000/password-reset/${token}">here</a><i/></b> to reset a new password!</p>
        //     `,
        // });
        console.log('http://localhost:3000/password-reset/${token}');
      })
      .catch((err) => {
        next(err);
      });
  });
};

exports.getPasswordReset = (req, res, next) => {
  const { token } = req.params;
  try {
    res.render('auth/password-reset.ejs', {
      pageTitle: 'password-reset',
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.postNewPassword = (req, res, next) => {
  const { token, password } = req.body;

  if (req.session.user) {
    res.redirect('/');
  }

  User.findResetTokenInfo(token)
    .then((user) => {
      const { resetTokenExpiration } = user;
      const now = Date.now();

      // check to see if its been 10
      // then has password and return
      if (resetTokenExpiration > now) {
        return bcrypt.hash(password, 10);
      }

      res.redirect('/');
    })
    .then((hashPassword) =>
      User.updatePasswordByToken(hashPassword, token).then((user) => {
        req.flash('error', 'You can now login with updated password!');
        res.render('auth/login', {
          pageTitle: 'login',
          errorMessage: req.flash('error'),
        });
        return user;
      })
    )
    .then((user) =>
      User.deletePasswordResetTokenInfo(user.id).then(() => {
        //   console.log('token has been deleted', deleted);
      })
    )
    .catch((err) => {
      next(err);
    });
};

// ----------  USER DETAILS ----------
exports.postUserDetails = (req, res, next) => {
  let currentSessionUserId = null;
  const picture = req.files.picture[0];
  const profilePictureUrl = picture.path;

  if (req.session.user) {
    currentSessionUserId = req.session.user.id;
  }

  User.updateProfilePicture(profilePictureUrl, currentSessionUserId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserDetails = (req, res, next) => {
  let profilePicture = null;

  try {
    if (req.session.user) {
      profilePicture = req.session.user.profilePictureUrl;
    }
    res.render('auth/user-details.ejs', {
      pageTitle: 'user-details.ejs',
      username: req.session.user.username,
      email: req.session.user.email,
      currentSessionUserId: req.session.user.id,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

exports.postUpdateUsername = (req, res, next) => {
  const { username } = req.body;
  let currentSessionUserId = null;

  if (req.session.user) {
    currentSessionUserId = req.session.user.id;
  }

  User.updateUsername(username, currentSessionUserId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
};
