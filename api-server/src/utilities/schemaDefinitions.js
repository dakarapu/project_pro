import Joi from "Joi";

export function courseObjValidation(body) {
  const courseSchema = Joi.object().keys({
    courseId: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    author: Joi.string(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    tags_2: Joi.array().items(Joi.string()),
    tags_3: Joi.array().items(Joi.string()),
    date: Joi.date().iso(),
    isPublished: Joi.boolean(),
    price: Joi.number().precision(2)
  });

  let { error } = Joi.validate(body, courseSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}

export function userObjValidation(body) {
  const userSchema = Joi.object().keys({
    firstName: Joi.string()
      .min(2)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    role: Joi.string().required()
  });

  let { error } = Joi.validate(body, userSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}

export function authObjValidation(body) {
  const authSchema = Joi.object().keys({
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });

  let { error } = Joi.validate(body, authSchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}
