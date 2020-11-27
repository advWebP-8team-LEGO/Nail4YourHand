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
const fs = require('fs');

module.exports = {
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
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Liker',
          attributes: [ 'id' ] // password, salt 제외한 정보를 가져온다!
        }]
      });

      let sortedPosts;

      if (standardOfSort === "date") {
        sortedPosts = postService.sortDate(posts);
      } else {
        sortedPosts = postService.sortLike(posts);
      }

      let likedArr = [];

      for(let post of sortedPosts) {
        for(let like of post.Liker) {
          if(userId == like.id) {
            likedArr.push(post.id);
          }
        }
      }

      const resultData = {
        "posts": sortedPosts,
        "currentUserId": userId,
        "likedArr": likedArr
      };

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_ALL_SUCCESS, resultData));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_ALL_FAIL));
    }
  },
  createPost: async (req, res) => {
    const userId = 1; // 세션 대체

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
  deletePost: async (req, res) => {
    const {
      id
    } = req.params;

    try {
      const deletedPost = await Post.findOne({
        where: {
          id
        }
      });
      await Post.destroy({
        where: {
          id
        }
      });
      fs.unlink(deletedPost.contents, function (err) {
        console.log('delete Post [' + deletedPost.id + ']');
      });

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS, {}));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_POST_FAIL));
    }
  },
  createLike: async (req, res) => {
    const PostId = req.params.postId;
    console.log("PostId: " + PostId);
    const UserId = 1; // 세션에서 받아온다고 가정

    if (!PostId || !UserId) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const post = await Post.findOne({
        where: {
          id: PostId
        }
      });

      if (!post) {
        console.log("존재하지 않는 게시글 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
      }

      const like = await Like.create({
        UserId,
        PostId
      });

      const newCnt = post.likeCnt + 1;

      console.log("newCnt: " + newCnt);

      await Post.update({
        likeCnt: newCnt
      }, {
        where: {
          id: PostId
        }
      });

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_LIKE_SUCCESS, like));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_LIKE_FAIL));
    }
  },
  deleteLike: async (req, res) => {
    const PostId = req.params.postId;
    console.log("PostId: " + PostId);
    const UserId = 1; // 세션에서 받아온다고 가정

    if (!PostId || !UserId) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const post = await Post.findOne({
        where: {
          id: PostId
        }
      })

      if (!post) {
        console.log("존재하지 않는 게시글 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
      }

      const like = await Like.findOne({
        where: {
          UserId,
          PostId
        }
      });

      if (!like) {
        console.log("존재하지 않는 좋아요 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_Like));
      }

      await Like.destroy({
        where: {
          UserId,
          PostId
        }
      });

      const newCnt = post.likeCnt - 1;

      console.log("newCnt: " + newCnt);

      await Post.update({
        likeCnt: newCnt
      }, {
        where: {
          id: PostId
        }
      });

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_LIKE_SUCCESS, like));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_LIKE_FAIL));
    }
  }
}