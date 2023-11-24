const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const path = require ('path');
const data_handler = require("../data_handler");
const mongoose = require("mongoose");

router.post("/", (req, res) => {
    data_handler.Users.find({
        username: {$regex:req.body.username}
    }).then((docs) => {
        if (docs.length == 0) {
            data_handler.registerNewUser(req.body);
            res.status(200).send();
        } else {
            res.status(409).send("Nombre de usuario ya existe");
        }
    }).catch((err) => {console.log(err);});
});

router.get("/:username", (req, res) => {
    data_handler.Users.find({
        username: {$regex:req.params.username}
    }).then((docs) => {
        if (docs.length == 0) {
            res.status(404).send();
        } else {
            res.status(200).send(docs[0]);
        }
    })
})

router.get("/:email/:password", (req, res) => {
    data_handler.Users.find({
        email: {$regex:req.params.email},
        password: {$regex:req.params.password}
    }).then((docs) => {
        if (docs.length == 0) {
            res.status(404).send();
        } else {
            res.status(200).send(docs[0].username);
        }
    })
});

module.exports = router;