import Joi from "Joi";

export function courseObjValidation(body, res) {
  const courseSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(2)
      .required()
  });

  let { error } = Joi.validate(body, courseSchema);

  if (error) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
}

export function userObjValidation(body, res) {
  const userSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    firstName: Joi.string()
      .min(2)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(5)
      .required(),
    phone: Joi.number()
      .integer()
      .positive()
      .min(10)
      .max(10)
      .required()
  });

  let { error } = Joi.validate(body, userSchema);

  if (error) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
}
