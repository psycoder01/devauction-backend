const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const { imageUpload, updateUser } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user route entered");
});
router.put("/", verify, updateUser);
router.delete("/:id"), (req, res) => {};
router.post("/image", verify, imageUpload);

module.exports = router;
