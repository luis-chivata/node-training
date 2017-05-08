"use strict";

const express = require('express');
const app = express();

const requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.use(requestTime);

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to the API"
    });
});

app.use((req, res, next) => {
    res.status(400);
    res.json({
        "error":"Error, Route not found"
    });
});

app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        "error": `${err}`
    });
});

module.exports = app;