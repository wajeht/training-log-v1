const Video = require('../models/video.js');
const config = require('../config/config.js');

// Email configuration for contact page
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
};
const transporter = nodemailer.createTransport(smtpConfig);

const ITEMS_PER_PAGE = 16;

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns index.ejs
 */
exports.getIndex = async (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  const page = +req.query.page || 1;
  let profilePicture = null;

  if (req.session.user) {
    username = req.session.user.username;
    currentSessionUserId = req.session.user.id;
    profilePicture = req.session.user.profilePictureUrl;
  }

  try {
    const res_countAllVideo = await Video.countAllVideos();
    let totalVideos = await res_countAllVideo.count;

    const res_fetchAll = await Video.fetchAll(ITEMS_PER_PAGE, page);
    const videosArray = await res_fetchAll;

    return res.render('index.ejs', {
      profilePicture,
      username: username,
      videosArray: videosArray,
      pageTitle: "JawStrength's TrainingVlog",
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
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns contact.ejs
 */
exports.getContact = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
    }

    return res.render('contact.ejs', {
      pageTitle: 'Contact',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns privacy.ejs
 */
exports.getPrivacy = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
    }

    return res.render('privacy.ejs', {
      pageTitle: 'Privacy',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns terms.ejs
 */
exports.getTerms = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
    }

    return res.render('terms.ejs', {
      pageTitle: 'Terms',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns faq.ejs
 */
exports.getFAQ = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
    }

    return res.render('faq.ejs', {
      pageTitle: 'FAQ',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns learn-more.ejs
 */
exports.getLearnMore = (req, res, next) => {
  let username = null;
  let currentSessionUserId = null;
  let profilePicture = null;

  try {
    if (req.session.user) {
      username = req.session.user.username;
      currentSessionUserId = req.session.user.id;
      profilePicture = req.session.user.profilePictureUrl;
    }

    return res.render('learn-more.ejs', {
      pageTitle: 'Learn more',
      username,
      currentSessionUserId,
      profilePicture,
    });
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 * @returns index.ejs
 */
exports.postContact = (req, res, next) => {
  try {
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
    return res.redirect('/');
  } catch (err) {
    next(err);
  }
};
