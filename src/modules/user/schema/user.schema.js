const Joi = require("joi");
const { ROLES } = require("../../../config/config");
const customMessages = {
  "string.email": "The email doesn't comply with the expected format!"
};

const name = Joi.string().min(4).max(255);
const last_name = Joi.string().min(3).max(225);
const email = Joi.string().min(6).max(225).email().message(customMessages);
const password = Joi.string().min(6).max(1024);
const role = Joi.string().valid(ROLES.ADMIN, ROLES.USER);
const roles = Joi.array().items(Joi.string());

const registerSchema = Joi.object({
  name: name.required(),
  last_name: last_name.required(),
  email: email.required(),
  password: password.required()
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const updateSchema = Joi.object({
  name,
  last_name,
  email,
  password
});

const roleSchema = Joi.object({
  roles: roles.required()
});

module.exports = { registerSchema, loginSchema, updateSchema, roleSchema };