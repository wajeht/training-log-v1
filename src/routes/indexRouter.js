const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController.js');

const { body } = require('express-validator');

router.get('/', indexController.getIndex);

router.get('/contact', indexController.getContact);

router.get('/faq', indexController.getFAQ);

router.get('/terms', indexController.getTerms);

router.get('/privacy', indexController.getPrivacy);

router.get('/learn-more', indexController.getLearnMore);

router.post(
  '/contact',
  body('email').isEmail().withMessage('Please enter a valid email!'),
  indexController.postContact
);

module.exports = router;
