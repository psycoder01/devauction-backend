const router = require("express").Router();

router.get('/',(req,res)=>{
  res.send("user route entered");
})

module.exports = router;