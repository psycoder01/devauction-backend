const router = require("express").Router();
const { imageUpload } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user route entered");
});

router.post("/image", imageUpload);

module.exports = router;
