const upload = require("./multer");

//Image upload controller
const imageUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send("Error Uploading Image");
    res.json({
      message: "File uploaded!",
      file: req.file,
    });
  });
};

module.exports = { imageUpload };
