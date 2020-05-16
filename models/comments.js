const mong = require("mongoose");

const commentsSchema = new mong.Schema(
  {
    body: {
      type: String,
      required: true,
    },
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

const Comments = mong.model("Comments", commentsSchema);
module.exports = Comments;
