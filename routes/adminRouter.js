const express = require('express');
const router = express.Router();

// controllers
const adminController = require('../controllers/adminController.js');

// /admin/video-details => GET
router.get('/video/:id', adminController.getVideo);

// /admin/add-video => GET
router.get('/add-video', adminController.getAddVideo);

// /admin/login => GET
router.get('/login', adminController.getLogin);

// /admin/login => POST
router.post('/login', adminController.postLogin);

// /admin/forgot-password => GET
router.get('/forgot-password', adminController.getForgotPassword);

// /admin/signup => GET
router.get('/signup', adminController.getSignup);

// /admin/add-video => POST
router.post('/add-video', adminController.postAddVideo);

// /admin/add-video => POST
router.post('/add-comment', adminController.postAddComment);

module.exports = router;
