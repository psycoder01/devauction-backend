const Post = require("../models/post.schema");

const getAllPost = (req, res) => {
  Post.find()
    .then((post) => res.json(post))
    .catch((err) => res.json("Error : ", err));
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send("Error : ", err));
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

module.exports = { getAllPost, getPost, addPost, deletePost };
