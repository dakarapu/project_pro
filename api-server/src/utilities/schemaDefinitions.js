import Joi from "Joi";

export function courseObjValidation(body, res) {
  const postSchema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
    name: Joi.string()
      .min(2)
      .required()
  });

  let { error } = Joi.validate(body, postSchema);

  if (error) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
}
