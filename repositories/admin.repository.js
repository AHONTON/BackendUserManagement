const Admin = require("../models/admin.model");

const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

const countAdmins = async () => {
  return await Admin.countDocuments();
};

const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};

const validateAdmin = async (email) => {
  return await Admin.findOneAndUpdate(
    { email },
    { isValidated: true },
    { new: true }
  );
};

const findAdminById = async (id) => {
  return await Admin.findById(id).select("nom prenom email");
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  countAdmins,
  createAdmin,
  validateAdmin,
};
