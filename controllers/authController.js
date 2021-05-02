const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ---------- AUTH ----------
exports.getLogin = (req, res, nexdt) => {
    console.log(req.session);
    res.render('auth/login.ejs', {
        isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;

    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destory((err) => {
        console.log(err);
        res.redirect('/');
    });
};

exports.postSignup = (req, res, next) => {
    const { email, username, password } = req.body;

    User.findOne(email)
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
        isAuthenticated: req.isLoggedIn,
    });
};

exports.getForgotPassword = (req, res, next) => {
    res.render('auth/forgot-password.ejs', {
        isAuthenticated: req.isLoggedIn,
    });
};
