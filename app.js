const express = require("express");
const shuffle = require('lodash.shuffle');
const sample = require('lodash.sample');
const cors = require('cors');

const products = require('./products.json');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to mock api"
    })
});

app.get("/api/random/products", (req, res) => {
    res.json(shuffle(products));
});

app.get("/api/random/products/:id", (req, res) => {
    res.json(sample(products));
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    res.json(product);
});

app.get("/api/current", (req, res) => {
    const d = new Date();
    res.json({now: d.getTime()});
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
