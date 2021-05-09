const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

// controllers
const adminController = require('../controllers/adminController.js');

// /admin/video-details => GET
router.get('/video/:id', adminController.getVideo);

router.post('/video/:id', isAuth.isAuth, adminController.postUpdateVideo);

router.get('/my-videos/:username', isAuth.isAuth, adminController.getMyVideos);

router.post('/post-author-videos/:username', adminController.postPostAutherVideos);

// /admin/add-video => GET
router.get('/add-video', isAuth.isAuth, adminController.getAddVideo);

// /admin/delete-video => POST
router.post('/delete-video/:id', isAuth.isAuth, adminController.postDeleteVideo);

// /admin/edit-video => POST
router.post('/edit-video/:id', isAuth.isAuth, adminController.postEditVideo);

// /admin/add-video => POST
router.post('/add-video', isAuth.isAuth, adminController.postAddVideo);

// /admin/add-video => POST
router.post('/add-comment', isAuth.isAuth, adminController.postAddComment);

module.exports = router;
