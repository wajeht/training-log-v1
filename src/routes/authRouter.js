const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/isAuth.js');
const authController = require('../controllers/authController.js');
const User = require('../models/user.js');

const { body } = require('express-validator');

router.get('/signup', authController.getSignup);

router.post(
  '/signup',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email!')
    .custom((value, { req }) => {
      return User.findByEmail(value).then((user) => {
        if (user) {
          return Promise.reject('Email already exist!');
        }
      });
    }),
  body('password', 'Password must be at least 10 character').isLength({
    min: 8,
  }),
  authController.postSignup
);
router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', isAuth.isAuth, authController.postLogout);

router.get('/forget-password', authController.getForgetPassword);

router.post('/forget-password', authController.postForgetPassword);

router.get('/password-reset/:token', authController.getPasswordReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
