const { eventModel, ticketModel } = require('../db/db');
const { successResponse } = require('../helper/responseTemplate');

const buyTickets = async (req, res) => {
    try {
        const { eventId, ticketType, quantity } = req.body;

        if (!eventId || !ticketType || !quantity) {
            return res.status(400).json({ error: { message: 'Missing required parameters' } });
        }

        const event = await eventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: { message: 'Event not found' } });
        }

        if (!event.ticketPrice && event.ticketPrice !== 0) {
            return res.status(400).json({ error: { message: 'Ticket price not defined for the event' } });
        }

        const newTickets = [];

        for (let i = 0; i < quantity; i++) {
            const newTicket = new ticketModel({
                ticketType,
                price: event.ticketPrice,
                quantity: 1,
            });

            newTickets.push(await newTicket.save());
        }

        res.status(201).json(
            await successResponse('Tickets successfully purchased', {
                tickets: newTickets,
            })
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const viewUserTickets = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        const userTickets = await ticketModel.findById(ticketId);

        if (!userTickets) {
            return res.status(404).json({ error: { message: 'Ticket not found' } });
        }
        res.status(200).json(
            await successResponse('Successfully retrieved user tickets', {
                userTickets,
            })
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    buyTickets,
    viewUserTickets
};

