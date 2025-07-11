const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().min(3).required(),
  role: Joi.string().valid('System Administrator', 'Normal User', 'Store Owner').required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
