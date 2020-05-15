const router = require("express").Router();
const verify = require("../middlewares/verifyToken");

const {addPost,getPost,getAllPost} =require('../controllers/post.controller');

router.get("/",getAllPost);
router.post('/',verify,addPost);
router.get('/:id',getPost);

module.exports = router;
