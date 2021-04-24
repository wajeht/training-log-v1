const express = require('express');
const router = express.Router();

// controllers
const adminController = require('../controllers/adminController.js');

router.get('/video-details', adminController.getVideoDetails);

router.get('/add-video', adminController.getAddVideo);

module.exports = router;
