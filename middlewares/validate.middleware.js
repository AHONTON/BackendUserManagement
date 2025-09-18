const Joi = require("joi");

const userSchema = Joi.object({
  photo: Joi.string().uri().allow("", null),
  nom: Joi.string().required(),
  prenoms: Joi.string().required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().pattern(/^\+?\d{7,15}$/).required(),
  residence: Joi.string().required(),
  domaine: Joi.string().required(),
  fonction: Joi.string().required(),
  structure: Joi.string().required(),
  lieuTravail: Joi.string().required(),
  contact: Joi.string().required(),
  opportunites: Joi.string().allow("", null),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = validateUser;
