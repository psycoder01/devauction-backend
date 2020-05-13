const router = require("express").Router();
const verify = require('../middlewares/verifyToken');
const { imageUpload } = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("user route entered");
});

router.post("/image", verify,imageUpload);

module.exports = router;
