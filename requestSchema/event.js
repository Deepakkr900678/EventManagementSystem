const Joi = require('joi');

const createEventSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required(),
    organizer: Joi.string().required(),
    ticketPrice:Joi.string().required(),
});

module.exports = {
    createEventSchema,
};
