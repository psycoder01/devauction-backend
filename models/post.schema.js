const mong = require("mongoose");

const userSchema = new mong.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mong.model('Users',userSchema);
module.exports = User;