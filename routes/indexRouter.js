const express = require('express');
const router = express.Router();

// controllers
const indexController = require('../controllers/indexController.js');

router.get('/', indexController.getIndex);
router.get('/contact', indexController.getContact);
router.get('/faq', indexController.getFAQ);
router.get('/terms', indexController.getTerms);
router.get('/privacy', indexController.getPrivacy);
router.get('/learn-more', indexController.getLearnMore);

router.post('/contact', indexController.postContact);

module.exports = router;
