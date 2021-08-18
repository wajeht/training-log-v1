const Video = require('../models/video.js');

const config = require('../config/config.js')

// Email
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const smtpConfig = {
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
        user: config.email.auth_user,
        pass: config.email.auth_pass,
    },
}
const transporter = nodemailer.createTransport(smtpConfig);

const ITEMS_PER_PAGE = 16;

exports.getIndex = async (req, res, next) => {
    let username = null;
    let currentSessionUserId = null;
    const page = +req.query.page || 1;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    try {
        const res_countAllVideo = await Video.countAllVideos();
        let totalVideos = await res_countAllVideo.count;

        const res_fetchAll = await Video.fetchAll(ITEMS_PER_PAGE, page);
        const videosArray = await res_fetchAll;

        return res.render('index.ejs', {
            username: username,
            videosArray: videosArray,
            pageTitle: 'Home',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalVideos,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalVideos / ITEMS_PER_PAGE),
            isAuthenticated: req.session.isLoggedIn,
            currentSessionUserId: currentSessionUserId,
        });
    } catch (err) {
        next(err.message);
    }
};

exports.getContact = (req, res) => {
    let username = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    res.render('contact.ejs', {
        pageTitle: 'Contact',
        username,
		currentSessionUserId,
    });
};

exports.getPrivacy = (req, res) => {
	let username = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    res.render('privacy.ejs', {
        pageTitle: 'Privacy',
        username,
		currentSessionUserId,
    });
};

exports.getTerms = (req, res) => {
    let username = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    res.render('terms.ejs', {
        pageTitle: 'Terms',
        username,
		currentSessionUserId,
    });
};

exports.getFAQ = (req, res) => {
    let username = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    res.render('faq.ejs', {
        pageTitle: 'FAQ',
        username,
		currentSessionUserId,
    });
};

exports.getLearnMore = (req, res) => {
	let username = null;
    let currentSessionUserId = null;

    if (req.session.user) {
        username = req.session.user.username;
        currentSessionUserId = req.session.user.id;
    }

    res.render('learn-more.ejs', {
        pageTitle: 'Learn more',
        username,
		currentSessionUserId,
    });
};

exports.postContact = (req, res) => {
	const { name, email, message } = req.body;

	 transporter.sendMail({
		to: `${config.sendGrid.fromEmail}`,
		from: `${name} <${config.sendGrid.fromEmail}>`,
		subject: `tvl.jawstrength.com's contact page`,
		html: `
		<p>${name}</p>
		<p>${email}</p>
		<p>${message}</p>
		`,
	 });
	
	res.redirect('/');

}