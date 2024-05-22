import Joi from "joi";

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      phone: Joi.string().allow("", null),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
