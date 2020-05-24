const Notif = require("../models/notifications");
const User = require("../models/user.schema");
const Posts = require("../models/post.schema");

const notifOnLike = async (from,to) => {
  try {
    let recipient = "";
    await Posts.findById(to)
      .then((result) => User.findById(result.userId))
      .then((result) => (recipient = result.name));

    const newNotif = new Notif({
      sender: from,
      recipient: recipient,
      action: "like",
      postId: to,
    });
    
    newNotif
      .save()
      .then(() => console.log("notifications saved"))
  } catch (err) {
    console.log(err);
  }
};
const notifOnComment = async () => {};

module.exports = {
  notifOnLike,
  notifOnComment,
};
