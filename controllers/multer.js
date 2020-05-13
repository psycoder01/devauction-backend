const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extFile = extArray[extArray.length - 1];

    cb(null, file.originalname + "-" + Date.now() + "." + extFile);
  },
});

const upload = multer({ storage: storage }).single("avatar");

module.exports = upload;
