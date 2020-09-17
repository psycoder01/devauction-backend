const mong = require("mongoose");

const postSchema = new mong.Schema(
  {
    content: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    likes: {
      type: [String]
    },
    likesCount: {
      type: Number,
      default: 0
    },
    comments: {
      type: [
        {
          _id: mong.Schema.Types.ObjectId,
          commenterId: String,
          comment: String
        }
      ]
    },
    commentsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Posts = mong.model("Posts", postSchema);
module.exports = Posts;
