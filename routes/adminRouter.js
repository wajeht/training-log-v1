const express = require('express');
const router = express.Router();

// controllers
const adminController = require('../controllers/adminController.js');

// /admin/video-details => GET
router.get('/video/:id', adminController.getVideo);

router.post('/video/:id', adminController.postUpdateVideo);

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

// /admin/delete-video => POST
router.post('/delete-video/:id', adminController.postDeleteVideo);

// /admin/edit-video => POST
router.post('/edit-video/:id', adminController.postEditVideo);

// /admin/add-video => POST
router.post('/add-video', adminController.postAddVideo);

// /admin/add-video => POST
router.post('/add-comment', adminController.postAddComment);

module.exports = router;
