const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const authController = require('../controllers/authController.js');

router.get('/user/:id', isAuth.isAuth, authController.getUserDetails);

router.post('/user/:id', authController.postUserDetails);

// /admin/login => GET
router.get('/login', authController.getLogin);

// /admin/login => POST
router.post('/login', authController.postLogin);

// /admin/login => POST
router.post('/logout', isAuth.isAuth, authController.postLogout);

// /admin/forgot-password => GET
router.get('/forget-password', authController.getForgetPassword);

router.post('/forget-password', authController.postForgetPassword);

router.get('/password-reset/:token', authController.getPasswordReset);

router.post('/new-password', authController.postNewPassword);

// /admin/signup => GET
router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

module.exports = router;
