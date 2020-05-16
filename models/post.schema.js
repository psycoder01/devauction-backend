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
    },
    likesCount:{
      type:Number,
      default:0
    },
    commentsCount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Posts = mong.model('Posts',postSchema);
module.exports = Posts;