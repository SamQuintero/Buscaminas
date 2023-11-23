const express = require('express');
const router = require("./router");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 3000;
const app = express();
let mongoConnection = "mongodb+srv://admin:dorx123@myapp.8yzr4bk.mongodb.net/Minesweeper";
let db = mongoose.connection;
mongoose.connect(mongoConnection);

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log("Aplicacion corriendo en puerto " + port);
    db.on("connected", () => {
        console.log("Aplicaion conectada a la db");
    })
});