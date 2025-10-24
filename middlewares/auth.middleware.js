const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérification de l'existence de l'admin
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin non trouvé" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Erreur middleware auth:", error.message);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      // Token invalide ou expiré → 401
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }
    // Pour les autres erreurs (DB, etc.), renvoyer 500
    return res.status(500).json({ message: "Erreur serveur auth" });
  }
};

module.exports = authMiddleware;
