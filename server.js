const express = require('express');
const router = require("./router");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 3000;
const app = express();
app.use(express.json());
let mongoConnection = "mongodb+srv://admin:dorx123@myapp.8yzr4bk.mongodb.net/Minesweeper";
let db = mongoose.connection;
mongoose.connect(mongoConnection);

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(router);

app.listen(port, () => {
    console.log("Aplicacion corriendo en puerto " + port);
    db.on("connected", () => {
        console.log("Aplicacion conectada a la db");
    })
});