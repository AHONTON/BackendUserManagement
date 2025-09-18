const Joi = require("joi");

const registerSchema = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().email().required(),
  sexe: Joi.string().valid("Homme", "Femme").required(),
  password: Joi.string().min(6).required(),
  photo: Joi.string().optional()
});

module.exports = { registerSchema };
