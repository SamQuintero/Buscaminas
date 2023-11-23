const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const path = require ('path');
const mongoose = require("mongoose");
const data_handler = require("../data_handler");

router.get("/:difficulty", (req, res) => {
    let Scores = data_handler.getScores;
    
    res.status(200);
    let top_3 = Scores[req.params.difficulty].slice(0, 3);
    for (let i = 0; i < 3; i++) {
        if (!top_3[i]) top_3[i] = '-';
    }
});

module.exports = router;