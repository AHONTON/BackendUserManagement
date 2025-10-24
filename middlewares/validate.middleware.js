const Joi = require("joi");

const userSchema = Joi.object({
  nom: Joi.string().required().messages({
    "any.required": "Le nom est obligatoire",
  }),
  prenoms: Joi.string().required().messages({
    "any.required": "Les prénoms sont obligatoires",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "L'adresse email est invalide",
    "any.required": "L'email est obligatoire",
  }),
  telephone: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Le numéro de téléphone est invalide",
      "any.required": "Le téléphone est obligatoire",
    }),
  residence: Joi.string().required(),
  domaine: Joi.string().required(),
  fonction: Joi.string().required(),
  structure: Joi.string().required(),
  lieuTravail: Joi.string().required(),
  contact: Joi.string().required(),
  opportunites: Joi.string().allow("", null),
  // Photo facultative
  photo: Joi.any().optional(),
});

const validateUser = (req, res, next) => {
  // Si multer a uploadé une photo, on l'ajoute à req.body
  if (req.file) {
    req.body.photo = req.file.filename; // ou req.file.path si tu veux le chemin complet
  }

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    console.log("❌ Erreurs de validation :", error.details);
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = validateUser;
