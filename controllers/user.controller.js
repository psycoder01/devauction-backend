const upload = require("./multer");
const User = require("../models/user.schema");
const main = require("../config/index");

const findUser = (req, res) => {
  User.findOne(
    { name: req.params.name },
    { name: 1, email: 1, imgUrl: 1, createdAt: 1 }
  )
    .then(result => {
      return res.json(result);
    })
    .catch(err => res.status(400).send("Error Finding User"));
};

const getUser = async (req, res) => {
  User.findOne({ _id: req.user.id }, { password: 0 })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).send("Server Error ! "));
};

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
      location: req.body.location
    },
    { new: true }
  )
    .then(() => res.send("Updated Details"))
    .catch(err => res.status(400).send("Error Updating Info"));
};

//Deleting a User
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.user.id)
    .then(() => res.send("Deleting user completely can take some time!"))
    .catch(err => res.status(400).send("Server Error!"));
};

//Image upload controller
const imageUpload = (req, res) => {
  //Multer Upload
  upload(req, res, err => {
    if (err) return res.status(400).send("Error Uploading Image");
  });

  //Update ImgUrl in Database
  User.findById(req.user.id)
    .then(item => {
      item.imgUrl = `${main}/${req.file.path}`;

      item.save();
    })
    .catch(err => res.status(400).send("Server Error"));

  return res.send("Avatar Updated Successfully");
};

module.exports = {
  imageUpload,
  updateUser,
  deleteUser,
  getUser,
  findUser
};
