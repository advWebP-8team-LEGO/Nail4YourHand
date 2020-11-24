const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/upload',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + Math.floor(Math.random() * 10) + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage
});


// [POST] localhost:3000/posts
router.post('/', upload.single('image'), postController.createPost);

// [GET] localhost:3000/posts/board
router.get('/board', postController.readPosts);

// [POST] localhost:3000/posts/:postId/like
router.post('/:postId/like', postController.createLike);

// [GET] localhost:3000/posts
router.get('/', function(req, res, next) {
  res.render('community');
});

// [DELETE] localhost:3000/posts/user-email

module.exports = router;