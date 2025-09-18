const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  photo: {
    type: String,
    validate: {
      validator: (v) => !v || validator.isURL(v),
      message: "Photo doit être une URL valide",
    },
  },
  nom: { type: String, required: [true, "Le nom est obligatoire"] },
  prenoms: { type: String, required: [true, "Les prénoms sont obligatoires"] },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email invalide",
    },
  },
  telephone: {
    type: String,
    required: [true, "Le téléphone est obligatoire"],
    validate: {
      validator: (v) => /^\+?\d{7,15}$/.test(v),
      message: "Téléphone invalide",
    },
  },
  residence: { type: String, required: [true, "La résidence est obligatoire"] },
  domaine: { type: String, required: [true, "Le domaine est obligatoire"] },
  fonction: { type: String, required: [true, "La fonction est obligatoire"] },
  structure: { type: String, required: [true, "La structure est obligatoire"] },
  lieuTravail: {
    type: String,
    required: [true, "Le lieu de travail est obligatoire"],
  },
  contact: {
    type: String,
    required: [true, "Le contact d'urgence est obligatoire"],
  },
  opportunites: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware pour mettre à jour updatedAt à chaque modification
userSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model("User", userSchema);
