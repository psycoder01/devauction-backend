const upload = require("./multer");
const User = require("../models/user.schema");
const main = require("../config/index");

const readUser = (req, res) => {};

const updateUser = (req, res) => {
  // User.findById(req.user).then(item => item.imageUrl = `${imgDirectory}/`
  // )
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

    return res.send('Avatar Updated Successfully');
};

module.exports = { imageUpload };
