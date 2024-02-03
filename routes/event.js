const router = require("express").Router();
const { createEvent } = require("../controllers/events")
const { viewAllEvents } = require("../controllers/events")
const { viewEventDetails } = require("../controllers/events")
const { searchEvents } = require("../controllers/events")
const {ratingEvent} = require("../controllers/events")
const {verifyJwtToken} = require("../middleware/auth")

router.post("/events", verifyJwtToken, createEvent);
router.get('/events', verifyJwtToken, viewAllEvents);
router.get('/events/:eventId', verifyJwtToken, viewEventDetails);
router.get('/event', verifyJwtToken, searchEvents);
router.post('/eventsRating', verifyJwtToken, ratingEvent);

module.exports = router;
