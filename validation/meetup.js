const Joi = require("joi").extend(require("@joi/date"));
exports.meetupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(3).max(255).required(),
    tag: Joi.string().min(2).max(255).required(),
    venue: Joi.string().min(2).max(255).required(),
    time: Joi.date().format("YYYY-MM-DD HH:mm:ssZZ"),
  });
  return schema.validate(data);
};
