const express = require('express');
const router = require("./router");
const cors = require("cors");

const port = 3000;
const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log("Aplicacion corriendo en puerto " + port);
});
