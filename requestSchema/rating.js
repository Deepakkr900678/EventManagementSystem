const Joi = require('joi');

const createRatingSchema = Joi.object({
    eventId: Joi.string().required(),
    rating: Joi.string().required(),
});

module.exports = {
    createRatingSchema
}