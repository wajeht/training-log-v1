const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth.js');

const adminController = require('../controllers/adminController.js');

router.get('/user-details/:id', isAuth.isAuth, adminController.getUserDetails);

router.post(
  '/user-details/:id',
  isAuth.isAuth,
  adminController.postUserDetails
);

router.get('/video/:id', adminController.getVideo);

router.post('/video/:id', isAuth.isAuth, adminController.postUpdateVideo);

router.get('/my-videos/:username', isAuth.isAuth, adminController.getMyVideos);

router.get('/videos/:username', adminController.getPostAutherVideos);

router.get('/add-video', isAuth.isAuth, adminController.getAddVideo);

router.post(
  '/delete-video/:id',
  isAuth.isAuth,
  adminController.postDeleteVideo
);

router.post('/edit-video/:id', isAuth.isAuth, adminController.postEditVideo);

router.post('/add-video', isAuth.isAuth, adminController.postAddVideo);

router.post('/add-comment', isAuth.isAuth, adminController.postAddComment);

router.get(
  '/comment-user-videos/:userId',
  adminController.getCommentUserVideos
);

module.exports = router;
