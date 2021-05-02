const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const authController = require('../controllers/authController.js');

// /admin/login => GET
router.get('/login',  authController.getLogin);

// /admin/login => POST
router.post('/login', authController.postLogin);

// /admin/login => POST
router.post('/logout', isAuth.isAuth, authController.postLogout);

// /admin/forgot-password => GET
router.get('/forgot-password', authController.getForgotPassword);

// /admin/signup => GET
router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

module.exports = router;
