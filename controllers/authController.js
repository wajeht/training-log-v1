const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ---------- LOGIN ----------
exports.getLogin = (req, res, nexdt) => {
    console.log('isLoggedIn', req.session.isLoggedIn);
    res.render('auth/login.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Login',
    });
};

exports.postLogin = (req, res, next) => {
    const { password, email } = req.body;

    User.findByEmail(email)
        .then((user) => {
            if (user == null) {
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

    // Check to see if use exists
    User.findByEmail(email)
        .then((user) => {
            if (user) {
                console.log({ USER_ALREADY_EXISTED: user });
                return res.redirect('/signup');
            }

            // If not, hash the password and register
            return bcrypt.hash(password, 10).then((hashPassword) => {
                User.addUser(email, username, hashPassword).then((user) => {
                    console.log({ SUCESSFULLY_REGISTERED: user });
                    return res.redirect('/login');
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Signup',
    });
};

// ---------- FORGOT PASSWORD ----------
exports.getForgotPassword = (req, res, next) => {
    res.render('auth/forgot-password.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Forgot password?',
    });
};
