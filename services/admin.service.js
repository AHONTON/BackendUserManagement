const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const {
  findAdminByEmail,
  countAdmins,
  createAdmin,
  validateAdmin,
} = require("../repositories/admin.repository");
const { sendValidationEmail } = require("../utils/sendMail");

const registerAdmin = async (data) => {
  const existingAdminCount = await countAdmins();
  if (existingAdminCount >= 1)
    throw new AppError("Un administrateur existe déjà !", 400);

  const existingEmail = await findAdminByEmail(data.email);
  if (existingEmail) throw new AppError("Cet email est déjà utilisé !", 400);

  data.password = await bcrypt.hash(data.password, 10);

  const admin = await createAdmin(data);

  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await sendValidationEmail(
    admin.email,
    token,
    admin.nom,
    admin.prenom,
    admin.photo
  );

  return admin;
};

const validateAdminAccount = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await validateAdmin(decoded.email);

    if (!admin) {
      return {
        success: false,
        message: "Validation impossible : admin introuvable !",
      };
    }

    return { success: true, message: "Compte validé avec succès !" };
  } catch (err) {
    throw new AppError("Token invalide ou expiré !", 401);
  }
};

const loginAdmin = async (email, password) => {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new AppError("Admin non trouvé !", 404);
  if (!admin.isValidated) throw new AppError("Admin non validé !", 403);

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new AppError("Mot de passe incorrect !", 401);

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { admin, token };
};

const getAdminProfile = async (id) => {
  const admin = await findAdminById(id);
  if (!admin) throw new AppError("Admin non trouvé !", 404);

  return {
    nom: admin.nom,
    prenom: admin.prenom,
    email: admin.email,
    statut: "connecté",
  };
};

module.exports = {
  registerAdmin,
  validateAdminAccount,
  loginAdmin,
  getAdminProfile,
};
