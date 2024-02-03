const { eventModel, ratingModel } = require('../db/db');
const { createEventSchema } = require('../requestSchema/event');
const {createRatingSchema} = require('../requestSchema/rating');
const { validationError, successResponse } = require('../helper/responseTemplate');

const createEvent = async (req, res) => {
  try {
    const { error, value } = createEventSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error && error.details) {
      return res.status(422).json({ errors: error.details });
    }

    const newEvent = new eventModel({
      ...value,
    });

    let event = await newEvent.save();

    res.status(201).json(
      await successResponse('Event successfully created', {
        event,
      })
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err.message });
  }
};

const viewAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json(
      await successResponse('Successfully retrieved all events', {
        events,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const viewEventDetails = async (req, res) => {
  try {
    const eventId = req.params.eventId; 

    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: { message: 'Event not found' } });
    }

    res.status(200).json(
      await successResponse('Successfully retrieved event details', {
        event,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { title, date, location } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: new RegExp(title, 'i') };
    }

    if (date) {
      query.date = new Date(date);
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') };
    }

    const events = await eventModel.find(query);

    res.status(200).json(
      await successResponse('Events successfully retrieved', {
        events,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ratingEvent = async (req, res) => {
  try {
    const { error, value } = createRatingSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error && error.details) {
      return res.status(422).json({ errors: error.details });
    }

    const { eventId, rating } = value;

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: { message: 'Event not found' } });
    }

    const newRating = new ratingModel({
      rating
    });

    await newRating.save();

    res.status(201).json(
      await successResponse('Rating successfully added', {
        rating: newRating,
      })
    );
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEvent,
  viewAllEvents,
  viewEventDetails,
  searchEvents,
  ratingEvent
};
