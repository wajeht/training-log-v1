// ---------- AUTH ----------
exports.getLogin = (req, res, nexdt) => {
    res.render('auth/login.ejs');
};

exports.postLogin = (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    };
    console.log({ login: data });
    res.redirect('/');
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup.ejs');
};

exports.getForgotPassword = (req, res, next) => {
    res.render('auth/forgot-password.ejs');
};
