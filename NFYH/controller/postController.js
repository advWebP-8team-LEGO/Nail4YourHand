const {
  User,
  Post,
  Like
} = require('../models');
const {
  postService
} = require('../service');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

module.exports = {
  // body: title, contents, userId
  createPost: async (req, res) => {
    const userId = 1;

    if (!userId) {
      console.log("필요한 값이 없습니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const image = req.file.path; // 이것으로 파일의 주소를 클라이언트에게 넘겨준다!
      console.log(image);
      console.log(req.file);
      console.log(req.body);

      const user = await User.findOne({
        where: {
          id: userId
        }
      });

      console.log(user);

      const post = await Post.create({
        contents: image,
        likeCnt: 0,
      });

      await user.addPost(post); // post에 해당 user에 대한 외래키 추가

      return res.redirect('/posts');
    } catch (err) {
      console.error(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL));
    }
  },
  readPosts: async (req, res) => {
    const {
      standardOfSort
    } = req.query;

    const userId = 1; // 세션에서 userId 가져왔다고 가정

    try {
      const posts = await Post.findAll({
        include: [{ // join -> 관계가 있는 테이블들끼리 합쳐주는 것!
          model: User, // 작성자
          attributes: ['email', 'name']
        }]
      });

      let sortedPosts;

      if (standardOfSort === "date") {
        sortedPosts = postService.sortDate(posts);
      } else {
        sortedPosts = postService.sortLike(posts);
      }

      const resultData = {
        "posts": sortedPosts,
        "currentUserId": userId
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_ALL_SUCCESS, resultData));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_ALL_FAIL));
    }
  },
  createLike: async (req, res) => {
    const PostId = Number.parseInt(req.params.postId);
    const UserId = req.body.userId;

    // 값 제대로 들어왔는지 체크 필요!

    try {
      const like = await Like.create({
        UserId,
        PostId
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_LIKE_SUCCESS, like));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_LIKE_FAIL));
    }
  },
}