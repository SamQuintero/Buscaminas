const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const path = require ('path');

router.post("/", (req, res) => {
    let Users = JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../db_test/users.json"), "utf-8"));
    let find_user = Users.find(u => u.username == req.body.username);
    if (find_user) res.status(409).send("Nombre de usuario ya existe");
    else {
        let new_user = req.body;
        new_user.scores = {
            "easy":[0],
            "normal":[0],
            "hard":[0]
        }
        Users.push(req.body);
        res.status(200).send();
        fs.writeFileSync(path.resolve(__dirname + "/../db_test/users.json"), JSON.stringify(Users));
    }
});

router.get("/:email/:password", (req, res) => {
    let Users = JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../db_test/users.json"), "utf-8"));
    let found_user = Users.find(u => u.email == req.params.email && u.password == req.params.password);

    if (!found_user) res.status(404).send();
    res.status(200).send();
    
});

module.exports = router;