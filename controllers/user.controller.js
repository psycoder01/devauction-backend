const upload = require("./multer");
const User = require("../models/user.schema");
const main = require("../config/index");

const readUser = (req, res) => {};

//Updating User Details
const updateUser = (req, res) => {
  let userDetails = {};
  //checking for empty values
  if (!req.body.bio.trim()) userDetails.bio = req.body.bio;
  if (!req.body.location.trim()) userDetails.location = req.body.location;

  User.findOneAndUpdate(
    req.user.id,
    {
      bio: req.body.bio,
      location: req.body.location,
    },
    { new: true }
  ).then(()=> res.send("Updated Details")).catch((err) => res.send("Error Updating Info"));
};

const deleteUser = (req, res) => {};

//Image upload controller
const imageUpload = (req, res) => {
  //Multer Upload
  upload(req, res, (err) => {
    if (err) return res.status(400).send("Error Uploading Image");
  });

  //Update ImgUrl in Database
  User.findById(req.user.id)
    .then((item) => {
      item.imgUrl = `${main}/${req.file.path}`;

      item.save();
    })
    .catch((err) => res.status(400).send("Error: " + err));

  return res.send("Avatar Updated Successfully");
};

module.exports = { imageUpload, updateUser };
