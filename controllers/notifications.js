const User = require("../models/user.schema");
const Posts = require("../models/post.schema");

const notifOnLike = async (from, to) => {
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

    newNotif.save().then(() => console.log("notifications saved"));
  } catch (err) {
    console.log(err);
  }
};
const notifOnComment = async (from, to) => {
  try {
    let recipient = "";
    await Posts.findById(to)
      .then((result) => User.findById(result.userId))
      .then((result) => (recipient = result.name));

    const newNotif = new Notif({
      sender: from,
      recipient: recipient,
      action: "comment",
      postId: to,
    });

    newNotif.save().then(() => console.log("notifications saved"));
  } catch (err) {
    console.log(err);
  }
};

const notifOnUnlike = async (from, to) => {
  try {
    let recipient = "";
    await Posts.findById(to)
      .then((result) => User.findById(result.userId))
      .then((result) => (recipient = result.name));

    let query = {
      sender: from,
      postId: to,
      recipient: recipient,
      action: "like",
    };
    Notif.findOneAndDelete(query).then(() =>
      console.log("Like Notification Deleted!")
    );
  } catch (err) {
    console.log(err);
  }
};
const notifOnUncomment = async (from, to) => {
  try {
    let recipient = "";
    await Posts.findById(to)
      .then((result) => User.findById(result.userId))
      .then((result) => (recipient = result.name));

    let query = {
      sender: from,
      postId: to,
      recipient: recipient,
      action: "comment",
    };
    Notif.findOneAndDelete(query).then(() =>
      console.log("Comment Notification Deleted!")
    );
  } catch (err) {
    console.log(err);
  }
};
const markRead = (notifIds) => {
  return Notif.updateMany(
    { _id: { $in: notifIds } },
    { $set: { read: true } }
  );
};
module.exports = {
  notifOnLike,
  notifOnComment,
  notifOnUnlike,
  notifOnUncomment,
  markRead,
};
