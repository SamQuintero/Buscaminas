const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const path = require ('path');
const mongoose = require("mongoose");
const data_handler = require("../data_handler");

router.get("/:difficulty", (req, res) => {
    data_handler.Scores[req.params.difficulty].find({}).then((docs) => {
        docs.sort(compareScores).reverse();
        res.status(200).send(docs);
    })
});

router.post("/:difficulty", (req, res) => {
    data_handler.registerNewScore(req.body, req.params.difficulty);
    res.status(200).send();
})

const compareScores = (a, b) => a.score - b.score;

module.exports = router;