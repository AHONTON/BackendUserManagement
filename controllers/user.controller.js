const userService = require("../services/user.service");

const addUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const user = await userService.addUser(data);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const updatedUser = await userService.updateUser(req.params.id, data);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
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
