const mong = require("mongoose");

const notificationSchema = new mong.Schema(
  {
    recipient: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    postId: { type: String, required: true },
  },
  { timestamps: true }
);

const Notifications = mong.model("Notifications", notificationSchema);
module.exports = Notifications;
