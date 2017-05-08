"use strict";

const express = require('express');
const morgan = require('morgan');
const logger = require('winston');

const api = require("./api");

const app = express();

const requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.use(morgan('common'));

app.use("/api",api);

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