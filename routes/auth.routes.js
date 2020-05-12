const router = require("express").Router();

router.get('/login',(req,res)=>{
  res.send("login route entered");
})

router.get('/register',(req,res)=>{
  res.send('regisert route');
})

module.exports = router;