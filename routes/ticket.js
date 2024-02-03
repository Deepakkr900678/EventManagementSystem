const router = require("express").Router();
const { buyTickets } = require("../controllers/tickets")
const { viewUserTickets } = require("../controllers/tickets")
const {verifyJwtToken} = require("../middleware/auth")

router.post("/tickets", verifyJwtToken, buyTickets);
router.get("/tickets/:ticketId", verifyJwtToken, viewUserTickets);

module.exports = router;
