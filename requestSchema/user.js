const joi = require("joi");

const createUserSchema = joi.object({
    id: joi.string().allow(null, ""),
    username: joi.string().required().max(50),
    password: joi
      .string()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=_!]{8,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain One upper case, One lower case, One Digit and One of this special characters @#$%^&+=_!",
      }),
  });

module.exports = {
    createUserSchema
}