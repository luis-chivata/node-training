"use strict";

const logger = require("winston");

exports.all = (req, res, next) => {
    res.json([
        { "_id": 1, "name": "Pedro Perez" },
        { "_id": 2, "name": "Juan Perez" }
    ]);
};

exports.post = (req, res, next) => {
    logger.info(req.body);
    res.json(req.body);
};

exports.get = (req, res, next) => {
    logger.info(req.params.id);
    res.json({ "_id": req.params.id });
};

exports.put = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};