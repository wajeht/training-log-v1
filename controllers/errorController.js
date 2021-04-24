exports.get404 = (req, res, next) => {
    res.setStatus = 404;
    res.render('404.ejs');
};
