const Post = require("../models/post.schema");

const {
  notifOnLike,
  notifOnComment,
  notifOnUnlike,
  notifOnUncomment
} = require("./notifications");

//Posts Controller
const getAllPost = (req, res) => {
  Post.find()
    .then(post => res.json(post))
    .catch(err => res.statue(400).json("Server Error"));
};
//Getting a single post details
const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(400).send("Server Error"));
};
//Adding a post
const addPost = async (req, res) => {
  const newPost = new Post({
    content: req.body.content,
    author: req.user.id
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
    .then(() => res.send("Post deleted successfully"))
    .catch(err => res.status(400).send("Server Error"));
};

//Comment Controllers
const addComment = (req, res) => {
  let commenter = {
    commenterId: req.user.id,
    comment: req.body.comment
  };
  Post.findByIdAndUpdate(req.params.id, {
    $inc: { commentsCount: 1 },
    $push: { comments: commenter }
  })
    .then(() => res.send("Comment Added!"))
    .catch(err => res.status(400).send("Server Error"));
};

const removeComment = async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    $inc: { commentsCount: -1 },
    $pull: {
      comments: {
        commenterId: req.user.id
      }
    }
  })
    .then(() => res.send("Commnet Deleted!"))
    .catch(err => res.status(400).send("Server Error"));
};

//Likes controller
const like = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    $inc: { likesCount: 1 },
    $addToSet: { likes: req.user.id }
  })
    .then(() => res.send("Post Liked!"))
    .catch(err => res.statue(400).send("Server Error"));
};
const unlike = async (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    $inc: { likesCount: -1 },
    $pull: { likes: req.user.id }
  })
    .then(() => res.send("Post DisLiked!"))
    .catch(err => res.statue(400).send("Server Error"));
};

module.exports = {
  getAllPost,
  getPost,
  addPost,
  deletePost,
  addComment,
  removeComment,
  like,
  unlike
};
