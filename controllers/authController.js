const User = require('../models/user.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const config = require('../config/config.js');

const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: config.sendGrid.apiKey,
        },
    })
);

// ---------- LOGIN ----------
exports.getLogin = (req, res, next) => {
    let currentSessionUserId = null;
    if (req.session.user) {
        res.redirect('/');
    }

    // console.log('isLoggedIn', req.session.isLoggedIn);

    res.render('auth/login.ejs', {
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
    });
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
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/login');
        });
};

exports.postLogout = (req, res, next) => {
    delete req.session.user;
    req.session.isLoggedIn = false;
    res.redirect('/');
};

// ---------- SIGNUP ----------
exports.postSignup = (req, res, next) => {
    const { email, username, password } = req.body;
    const errors = validationResult(req);
    const oldInput = {
        email: email,
        username: username,
        password: password,
    };

    // if we failed, render the same page again
    if (errors.array().length > 0) {
        return res.status(422).render('auth/signup.ejs', {
            pageTitle: 'Signup',
            errorMessage: errors.array(),
            oldInput: oldInput,
        });
    }

    bcrypt
        .hash(password, 10)
        .then((hashPassword) => {
            // console.log('#################', hashPassword);
            User.addUser(email, username, hashPassword).then((user) => {
                // console.log({ SUCESSFULLY_REGISTERED: user });
                return res.redirect('/login');
            });
        })
        .then(() => {
            console.log('#####', {
                message: 'SUCCESSFULLY REGISTERED!',
            });
            // return transporter.sendMail({
            //     to: email,
            //     from: config.sendGrid.fromEmail,
            //     subject: 'Signup succefull',
            //     html: '<h1>You go it up!</h1>',
            // });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getSignup = (req, res, next) => {
    const errorMessage = req.flash('error');

    if (req.session.user) {
        res.redirect('/');
    }
    res.render('auth/signup.ejs', {
        pageTitle: 'Signup',
        errorMessage: errorMessage,
        oldInput: {},
    });
};

// ---------- FORGOT PASSWORD ----------
exports.getForgetPassword = (req, res, next) => {
    res.render('auth/forget-password.ejs', {
        pageTitle: 'Forgot password?',
        errorMessage: req.flash('error'),
    });
};

exports.postForgetPassword = (req, res, nexxt) => {
    const { email } = req.body;

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/forget-password');
        }
        const token = buffer.toString('hex');

        User.findByEmail(email)
            .then((user) => {
                if (!user) {
                    req.flash('error', 'not user found with that email');
                    return res.redirect('/forget-password');
                }

                const id = user.id;
                const resetToken = token;
                const resetTokenExpiration = new Date(new Date().getTime() + 5 * 60000);
                return User.updateToken(id, resetToken, resetTokenExpiration);
            })
            .then((user) => {
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
                console.log(err);
            });
    });
};

exports.getPasswordReset = (req, res, nexxt) => {
    const { token } = req.params;
    res.render('auth/password-reset.ejs', {
        pageTitle: 'password-reset',
        token: token,
    });
};

exports.postNewPassword = (req, res, next) => {
    const { token, password } = req.body;

    let currentSessionUserId = null;
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
        .then((hashPassword) => {
            return User.updatePasswordByToken(hashPassword, token).then((user) => {
                req.flash('error', 'You can now login with updated password!');
                res.render('auth/login', {
                    pageTitle: 'login',
                    errorMessage: req.flash('error'),
                });
                return user;
            });
        })
        .then((user) => {
            return User.deletePasswordResetTokenInfo(user.id).then((deleted) => {
                console.log('token has been deleted', deleted);
                return;
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// ----------  USER DETAILS ----------
exports.postUserDetails = (req, res, next) => {
    let currentSessionUserId = null;
    const { profilePictureUrl } = req.body;

    if (req.session.user) {
        currentSessionUserId = req.session.user.id;
    }

    User.updateProfilePicture(profilePictureUrl, currentSessionUserId)
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getUserDetails = (req, res, next) => {
    res.render('auth/user-details.ejs', {
        pageTitle: 'user-details.ejs',
        username: req.session.user.username,
        email: req.session.user.email,
        currentSessionUserId: req.session.user.id,
    });
};
