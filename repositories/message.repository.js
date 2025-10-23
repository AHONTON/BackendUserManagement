const Message = require("../models/message.model");

// Créer et sauvegarder un message
const createMessage = async (data) => {
  return await Message.create(data);
};

// Récupérer tous les messages d'un admin
const getMessagesByAdmin = async (adminId, limit = 20) => {
  return await Message.find({ adminId }).sort({ createdAt: -1 }).limit(limit);
};

// Marquer un message comme lu
const markMessageAsRead = async (messageId) => {
  return await Message.findByIdAndUpdate(
    messageId,
    { isRead: true },
    { new: true }
  );
};

// Supprimer un message
const deleteMessage = async (messageId) => {
  return await Message.findByIdAndDelete(messageId);
};

module.exports = {
  createMessage,
  getMessagesByAdmin,
  markMessageAsRead,
  deleteMessage,
};
