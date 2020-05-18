const router = require("express").Router();
const verify = require("../middlewares/verifyToken");

const {
  addPost,
  getPost,
  getAllPost,
  addComment,
  removeComment,
  like,
  unlike,
} = require("../controllers/post.controller");

//Post Routes
router.get("/", getAllPost);
router.post("/", verify, addPost);
router.get("/:id", getPost);

//Comment routes
router.post("/:id/comment", verify, addComment);
router.delete("/:id/uncomment", verify, removeComment);

//Like And Unlike Routes
router.post("/:id/like", verify, like);
router.post("/:id/unlike", verify, unlike);

module.exports = router;
