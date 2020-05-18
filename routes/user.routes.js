const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const { imageUpload, updateUser,deleteUser,getUser,findUser } = require("../controllers/user.controller");

router.get("/:name", findUser);
router.get('/',verify,getUser)
router.put("/", verify, updateUser);
router.delete("/",verify, deleteUser);
router.post("/image", verify, imageUpload);

module.exports = router;
