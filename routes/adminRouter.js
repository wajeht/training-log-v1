const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const adminController = require('../controllers/adminController.js');

// /admin/video-details => GET
router.get('/video/:id', adminController.getVideo);

// /admin/video/:id => POST
router.post('/video/:id', isAuth.isAuth, adminController.postUpdateVideo);

// /admin/my-video/:username => GET
router.get('/my-videos/:username', isAuth.isAuth, adminController.getMyVideos);

// /admin/videos/:username => GET
router.get('/videos/:username', adminController.getPostAutherVideos);

// /admin/add-video => GET
router.get('/add-video', isAuth.isAuth, adminController.getAddVideo);

// /admin/delete-video => POST
router.post(
  '/delete-video/:id',
  isAuth.isAuth,
  adminController.postDeleteVideo
);

// /admin/edit-video => POST
router.post('/edit-video/:id', isAuth.isAuth, adminController.postEditVideo);

// /admin/add-video => POST
router.post('/add-video', isAuth.isAuth, adminController.postAddVideo);

// /admin/add-video => POST
router.post('/add-comment', isAuth.isAuth, adminController.postAddComment);

// /admin/comment-user-video/:userId => POST
router.get(
  '/comment-user-videos/:userId',
  adminController.getCommentUserVideos
);

module.exports = router;
