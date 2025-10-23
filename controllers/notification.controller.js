const {
  fetchNotifications,
  readNotification,
} = require("../services/notification.service");

const getNotifications = async (req, res, next) => {
  try {
    const adminId = req.user.id; // récupéré via authMiddleware
    const notifications = await fetchNotifications(adminId);
    res.json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await readNotification(id, req.app.get("io"));
    res.json({ success: true, notification });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications, markAsRead };
