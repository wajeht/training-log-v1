const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ---------- AUTH ----------
exports.getLogin = (req, res, nexdt) => {
    console.log('isLoggedIn', req.session.isLoggedIn);
    res.render('auth/login.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Login',
    });
};

exports.postLogin = (req, res, next) => {
    User.findById(1)
        .then((user) => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    delete req.session.user;
    req.session.isLoggedIn = false;
    res.redirect('/');
};

exports.postSignup = (req, res, next) => {
    const { email, username, password } = req.body;

    User.findByEmail(email)
        .then((result) => {
            // if user exist, redirect to '/signup' page
            // else do the registration
            if (result) {
                // console.log('***** ALREADY EXISTSED *****');
                return res.redirect('/signup');
            } else {
                User.addUser(email, username, password)
                    .then((result) => {
                        // console.log('***** JSUT REGISTERED *****');
                        return res.redirect('/login');
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Signup',
    });
};

exports.getForgotPassword = (req, res, next) => {
    res.render('auth/forgot-password.ejs', {
        isAuthenticated: req.session.user,
        pageTitle: 'Forgot password?',
    });
};
