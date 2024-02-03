const router = require("express").Router();

const { leaveComment } = require("../controllers/comments")
const {verifyJwtToken} = require("../middleware/auth");

router.post("/comments", verifyJwtToken, leaveComment);

module.exports = router;

