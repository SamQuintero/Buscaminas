const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const path = require ('path');

router.get("/:difficulty", (req, res) => {
    let Scores = JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../db_test/scores.json"), "utf-8"));
    
    res.status(200);
    if (Scores[req.params.difficulty].length == 0) {
        res.send(['-', '-', '-']);
    } else {
        res.send(Scores[req.params.difficulty].slice(0, 3));
    }
})

module.exports = router;