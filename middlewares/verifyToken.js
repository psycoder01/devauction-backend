const jwt = require("jsonwebtoken");

const verfiy = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(401).send("Unauthorized access");

  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    console.log(verified);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verfiy;