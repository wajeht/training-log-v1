const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController.js');

const { body } = require('express-validator');

// / => GET
router.get('/', indexController.getIndex);

// /contact => GET
router.get('/contact', indexController.getContact);

// /faq => GET
router.get('/faq', indexController.getFAQ);

// /terms => GET
router.get('/terms', indexController.getTerms);

// /privacy => GET
router.get('/privacy', indexController.getPrivacy);

// /learn-more => GET
router.get('/learn-more', indexController.getLearnMore);

// /contact => POST
router.post(
  '/contact',
  body('email').isEmail().withMessage('Please enter a valid email!'),
  indexController.postContact
);

module.exports = router;
