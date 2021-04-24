const express = require('express');
const router = express.Router();

// controllers
const adminController = require('../controllers/adminController.js');

// /admin/video-details => GET
router.get('/video-details', adminController.getVideoDetails);

// /admin/add-video => GET
router.get('/add-video', adminController.getAddVideo);

// /admin/add-video => POST
router.post('/add-video', adminController.postAddVideo);

module.exports = router;
