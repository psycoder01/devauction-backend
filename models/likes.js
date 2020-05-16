const mong = require("mongoose");

const likesSchema = new mong.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Likes = mong.model("Likes", likesSchema);
module.exports = Likes;
