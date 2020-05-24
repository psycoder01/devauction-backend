const Post = require("../models/post.schema");
const Comment = require("../models/comments");
const Likes = require("../models/likes");

const { notifOnLike, notifOnComment } = require("./notifications");

//Posts Controller
const getAllPost = (req, res) => {
  Post.find()
    .then((post) => res.json(post))
    .catch((err) => res.json("Error : " + err));
};
//Getting a single post details
const getPost = async (req, res) => {
  let postDetails = {};
  await Post.findById(req.params.id)
    .then((result) => {
      postDetails.details = result;
      return Comment.find({ postId: req.params.id });
    })
    .then((result) => {
      postDetails.comments = result.sort((a, b) => b.createdAt - a.createdAt);
      res.json(postDetails);
    })
    .catch((err) => res.status(400).send("Error : " + err));
};
//Adding a post
const addPost = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  });

  try {
    await newPost.save();
    res.send("Post Added");
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
};

//Delete post
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() =>
      Promise.all([
        Likes.deleteMany({ postId: req.params.id }),
        Comment.deleteMany({ postId: req.params.id }),
      ])
    )
    .then(() => res.send("Post deleted successfully"))
    .catch((err) => res.status(400).send("Error " + err));
};

//Comment Controllers
const addComment = (req, res) => {
  const newComment = new Comment({
    body: req.body.body,
    userId: req.user.id,
    postId: req.params.id,
  });

  newComment
    .save()
    .then(() => {
      Post.findByIdAndUpdate(req.params.id, {
        $inc: { commentsCount: 1 },
      }).catch((err) => res.send(err));
      res.send("Comment Added");
    })
    .catch((err) => res.status(400).send("Error : " + err));
};
const removeComment = async (req, res) => {
  Comment.findOneAndDelete({ body: req.body.body })
    .then(() => {
      Post.findByIdAndUpdate(req.params.id, {
        $inc: { commentsCount: -1 },
      }).catch((err) => res.send(err));
      res.send("Comment Removed");
    })
    .catch((err) => res.send(err));
};

//Likes controller
const like = async (req, res) => {
  let query = { userId: req.user.id, postId: req.params.id };
  await Likes.find(query)
    .then((item) => {
      if (item.length > 0) return res.status(400).send("Already Liked");

      const newLike = new Likes({
        userId: req.user.id,
        postId: req.params.id,
      });

      newLike.save().then(() =>
        Post.findByIdAndUpdate(req.params.id, {
          $inc: { likesCount: 1 },
        })
      );
    })
    .then(() => res.send("Post Liked!"))
    .catch((err) => res.send("Error " + err));
  notifOnLike(req.user.name, query.postId).catch((err) => console.error(err));
};
const unlike = async (req, res) => {
  let query = { userId: req.user.id, postId: req.params.id };
  await Likes.find(query)
    .then((item) => {
      if (item.length > 0)
        return Likes.findByIdAndDelete(item[0]._id).then(() => {
          Post.findByIdAndUpdate(req.params.id, {
            $inc: { likesCount: -1 },
          }).catch((err) => res.send(err));
          res.send("Post Disliked");
        });
      return res.status(400).send("Post not found");
    })
    .catch((err) => {
      return res.status(400).send("Error " + err);
    });
};
module.exports = {
  getAllPost,
  getPost,
  addPost,
  deletePost,
  addComment,
  removeComment,
  like,
  unlike,
};
