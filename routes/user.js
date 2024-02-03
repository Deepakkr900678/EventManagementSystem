const router = require("express").Router();
const { createUser } = require("../controllers/user");

router.post("/users", createUser);

module.exports = router;