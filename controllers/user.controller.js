const userService = require("../services/user.service");
const { notifyUserCreated, notifyUserUpdated, notifyUserDeleted } = require("../services/notification.service"); 

const addUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const user = await userService.addUser(data);

    //  Notifier l'admin de la création d'un nouvel utilisateur
    await notifyUserCreated(req.user.id, user);

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await userService.getUsers(limit);

    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const updatedUser = await userService.updateUser(req.params.id, data);

    // Notifier la mise à jour d’un utilisateur
    await notifyUserUpdated(req.user.id, updatedUser);

    res.json({ success: true, updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    //  Récupérer l'utilisateur avant suppression
    const user = await userService.getUser(req.params.id);

    await userService.deleteUser(req.params.id);

    //  Notifier la suppression d’un utilisateur
    await notifyUserDeleted(req.user.id, user);

    res.json({ success: true, message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
