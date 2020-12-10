const express = require("express");
const router = express.Router();
const postController = require('../controller/postController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: "public/upload",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "_" +
        Math.floor(Math.random() * 10) +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage,
});

// [GET] localhost:3000/posts
router.get('/', function(req, res, next) {
  res.render('community', {
    session: req.session
  });
});

// [GET] localhost:3000/posts/board
router.get("/board", postController.readPosts);

// [POST] localhost:3000/posts
router.post("/", upload.single("image"), postController.createPost);

// [DELETE] localhost:3000/posts/user-email
router.delete("/:id", postController.deletePost);

// [POST] localhost:3000/post/:postId/like
router.post("/:postId/like", postController.createLike);

// [POST] localhost:3000/posts/:postId/like
router.delete("/:postId/like", postController.deleteLike);

module.exports = router;
