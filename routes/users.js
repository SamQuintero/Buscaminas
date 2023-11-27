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
router.put('/',(req,res)=>{
    console.log('Actulizando....');
    let id=req.body.id,
        username=req.body.username,
        email=req.body.email,
        password=req.body.password,
        image=req.body.image, 
        scores=req.body.scores,
        object_to_update={},
        flag_updated=false;
    if(username!=undefined){
        object_to_update.username=username;
        flag_updated=true;
    }
    if( email!=undefined){
        object_to_update.email=email;
        flag_updated=true;
    }
    if( password!=undefined){
        object_to_update.password=password;
        flag_updated=true;
    }
    if( image!=undefined ){
        object_to_update.image=image;
        flag_updated=true;
    }
    if(scores!=undefined){
        object_to_update.scores=scores;
        flag_updated=true;
    }
    console.log(id);
    if(flag_updated){
        data_handler.Users.findByIdAndUpdate(id, object_to_update,{new:true}).then((doc)=>{
            console.log('Actualizado');
            console.log(doc);
            res.send(doc);
        }).catch((err)=>console.log(err));
    }
    else{
        res.send("No se a actualizado");
    }
})
router.delete('/',(req,res)=>{
    console.log("Eliminando..")
    let id=req.body.id;
    data_handler.Users.findByIdAndDelete(id).then((doc)=>{
        console.log('Eliminado');
            console.log(doc);
            res.send(doc);
    }).catch((err)=>console.log(err));
});
module.exports = router;