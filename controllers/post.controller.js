const Post = require("../models/post.schema");
const Comment = require("../models/comments");
const Likes = require("../models/likes");

//Posts Controller
const getAllPost = (req, res) => {
  Post.find()
    .then((post) => res.json(post))
    .catch((err) => res.json("Error : " + err));
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send("Error : " + err));
};

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
const deletePost = (req, res) => {};

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
  Comment.findOneAndDelete({body:req.body.body})
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

      newLike.save().then(() => {
        Post.findByIdAndUpdate(req.params.id, {
          $inc: { likesCount: 1 },
        }).catch((err) => res.send(err));
        res.send("Post Liked!");
      });
    })
    .catch((err) => {
      return res.status(400).send("Error " + err);
    });
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
