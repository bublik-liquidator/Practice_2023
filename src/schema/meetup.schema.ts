import * as Joi from 'joi'
import JoiDate from '@joi/date';
const JoiExtended = Joi.extend(JoiDate)

const schema = JoiExtended.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(3).max(255),
    tags: Joi.array().items(Joi.string()).min(2).max(255),
    place: Joi.string().min(2).max(255).required(),
    time: Joi.date().format("YYYY-MM-DD HH:mm:ssZZ").required(),
}); 

export default schema;
