const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const {
    imageUpload,
    updateUser,
    deleteUser,
    getUser,
    findUser,
    getUsers,
    followUser,
    unfollowUser,
} = require("../controllers/user.controller");

router.get("/:name", findUser);
router.get("/", verify, getUser);
router.put("/", verify, updateUser);
router.delete("/", verify, deleteUser);
router.post("/image", verify, imageUpload);
router.post("/users", verify, getUsers);
router.post("/follow", verify, followUser);
router.post("/unfollow", verify, unfollowUser);

module.exports = router;
