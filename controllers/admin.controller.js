const {
  registerAdmin,
  validateAdminAccount,
  loginAdmin,
} = require("../services/admin.service");

const AppError = require("../utils/AppError");

const register = async (req, res, next) => {
  try {
    await registerAdmin({ ...req.body, photo: req.file?.filename });
    res.status(201).json({
      success: true,
      message: "Inscription réussie. Vérifiez votre email pour valider !",
    });
  } catch (error) {
    next(error);
  }
};

const validate = async (req, res, next) => {
  const { token } = req.query;

  try {
    const result = await validateAdminAccount(token);

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { admin, token } = await loginAdmin(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      success: true,
      message: "Connexion réussie !",
      admin,
      token,
    });
  } catch (error) {
    // Si c'est un AppError, on utilise son code et message
    if (error instanceof AppError) {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message || "Connexion impossible, vérifiez vos données.",
      });
    }
    next(error);
  }
};

module.exports = { register, validate, login };
