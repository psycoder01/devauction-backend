const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("./validation");

const User = require("../models/user.schema");

const register = async (req, res) => {
  //Validating user data
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!req.body.email.match(regEx))
    return res.status(400).send("Email not valid");

  const { error } = validator.register(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email already exist
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) return res.status(400).send("Email Already Registered");

  //Password Hasing
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //creating the user data
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  //Saving the user data
  try {
    await newUser.save();
    res.send("New User Registered");
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  //Email Pattern Check
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!req.body.email.match(regEx))
    return res.status(400).send("Email not valid");

  //Validating user data
  const { error } = validator.login(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking for duplicate email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Credentials!");

  //Checking Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorret Credentials!");

  //Token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN);
  res.header("authorization", token).send(token);
};

module.exports = { register, login };
