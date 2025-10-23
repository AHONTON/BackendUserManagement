const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String },
    sexe: { type: String, enum: ["Homme", "Femme"], required: true },
    password: { type: String, required: true },
    isValidated: { type: Boolean, default: false }, // Pour validation par mail
    gmailRefreshToken: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
