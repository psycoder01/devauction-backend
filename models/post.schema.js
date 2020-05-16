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
    likes:{
      type:Number,
      default:0
    },
    comments:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Posts = mong.model('Posts',postSchema);
module.exports = Posts;