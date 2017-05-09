"use strict";

const express = require('express');
const morgan = require('morgan');
const logger = require('winston');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const api = require("./api/v1");

mongoose.connect(config.db.url);

const app = express();

const requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use("/api", api);
app.use("api/v1", api);

app.get('/', (req, res) => {
    logger.info("Home Page")
    res.json({
        "message": "Welcome to the API"
    });
});

app.use((req, res, next) => {
    logger.info("Route not found");
    res.status(400);
    res.json({
        "error":"Error, Route not found"
    });
});

app.use((err, req, res, next) => {
    logger.error("Error");
    res.status(500);
    res.json({
        "error": `${err}`
    });
});

module.exports = app;