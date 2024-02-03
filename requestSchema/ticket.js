const Joi = require('joi');

const createEventSchema = Joi.object({
    eventId: Joi.string().required(),
    ticketType: Joi.string().required(),
    quantity: Joi.date().required(),
    ticketPrice: Joi.string().required(),
});

module.exports = {
    createEventSchema,
};
