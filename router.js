const express = require('express');
const router = express.Router();
const path = require ('path');
const users = require("./routes/users");
const scores = require("./routes/scores");


router.use("/users", users);
router.use("/scores", scores);

module.exports = router;