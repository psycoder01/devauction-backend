const Joi = require("@hapi/joi");

const register = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};

const login = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};

module.exports = { register, login };
