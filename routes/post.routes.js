const router = require("express").Router();
const verify = require("../middlewares/verifyToken");

router.get("/", verify, (req, res) => {
  res.send("post route entered");
});

module.exports = router;
