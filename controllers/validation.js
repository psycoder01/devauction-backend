const Joi = require("@hapi/joi");

const register = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .regex(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};

const login = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .regex(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string().require().min(8),
  });
  return schema.validate(data);
};

module.exports = { register, login };
