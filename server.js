const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const logger = require("./middlewares/logger");

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Dossier pour les fichiers uploadés
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

// Route d'accueil
app.get("/", (req, res) => {
  res.send("🚀 Bienvenue sur l'API UserManagement !");
});

// Middleware global d'erreur
app.use(errorHandler);

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET non défini dans le fichier .env !");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
