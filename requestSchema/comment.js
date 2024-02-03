const Joi = require('joi');

const createCommentSchema = Joi.object({
    eventId: Joi.string().required(),
    text: Joi.string().required(),
});

module.exports = {
    createCommentSchema,
};
