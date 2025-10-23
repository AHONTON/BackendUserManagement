const {
  createNotification,
  getNotificationsByAdmin,
  markNotificationRead,
} = require("../repositories/notification.repository");

const notifyUserCreated = async (adminId, user, io) => {
  const message = `Nouvel utilisateur ajouté : ${user.nom} ${user.prenoms}`;
  const notif = await createNotification({
    adminId,
    userId: user._id,
    type: "user_created",
    message,
  });

  if (io) {
    io.emit("notification:new", notif);
  }

  return notif;
};

const notifyUserUpdated = async (adminId, user, io) => {
  const message = `Utilisateur mis à jour : ${user.nom} ${user.prenoms}`;
  const notif = await createNotification({
    adminId,
    userId: user._id,
    type: "user_updated",
    message,
  });

  if (io) {
    io.emit("notification:new", notif);
  }

  return notif;
};

const notifyUserDeleted = async (adminId, user, io) => {
  const message = `Utilisateur supprimé : ${user.nom} ${user.prenoms}`;
  const notif = await createNotification({
    adminId,
    userId: user._id,
    type: "user_deleted",
    message,
  });

  if (io) {
    io.emit("notification:new", notif);
  }

  return notif;
};

const fetchNotifications = async (adminId) => {
  return await getNotificationsByAdmin(adminId);
};

const readNotification = async (notificationId, io) => {
  const notif = await markNotificationRead(notificationId);

  if (io) {
    io.emit("notification:read", notif);
  }

  return notif;
};

module.exports = {
  notifyUserCreated,
  notifyUserUpdated,
  notifyUserDeleted,
  fetchNotifications,
  readNotification,
};
