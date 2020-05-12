const router = require("express").Router();

router.get('/',(req,res)=>{
  res.send("post route entered");
})

module.exports = router;