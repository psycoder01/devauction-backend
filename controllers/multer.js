const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extFile = extArray[extArray.length - 1];

    cb(null, file.originalname + "-" + Date.now() + "." + extFile);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
}).single("avatar");

function checkFileTypes(file, cb) {
  //Allowed Extesions
  const fileTypes = /jpg|jpeg|png|gif/;

  //File Extension Checkup and Mime checkup
  const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = fileTypes.test(file.mimetype);

  if (mime && ext) {
    return cb(null, true);
  } else {
    return cb("Error: Not a valid Image file");
  }
}

module.exports = upload;
