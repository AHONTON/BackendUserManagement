const Notification = require("../models/notification.model");

const createNotification = async ({ adminId, userId, type, message }) => {
  const notif = new Notification({
    admin: adminId,
    user: userId,
    type,
    message,
  });
  return await notif.save();
};

const getNotificationsByAdmin = async (adminId) => {
  return await Notification.find({ admin: adminId })
    .populate("user", "nom prenoms email")
    .sort({ createdAt: -1 });
};

const markNotificationRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true }
  );
};

module.exports = { createNotification, getNotificationsByAdmin, markNotificationRead };
