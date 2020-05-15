const mong = require("mongoose");

const postSchema = new mong.Schema(
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
      type: String
    },
    userId:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const Posts = mong.model('Posts',postSchema);
module.exports = Posts;