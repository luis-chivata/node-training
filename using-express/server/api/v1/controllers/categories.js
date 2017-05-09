"use strict";

const logger = require("winston");

exports.all = (req, res, next) => {
    res.json([
        { "_id": 1, "name": "Matematicas" },
        { "_id": 2, "name": "Fisica" },
        { "_id": 3, "name": "Historia"}
    ]);
};

exports.post = (req, res, next) => {
    logger.info(req.body);
    res.json(req.body);
};

exports.get = (req, res, next) => {
    logger.info(req.params.id);
    res.json({"_id": req.params.id});
}

exports.put = (req, res, next) => {
    res.json({});
}

exports.delete = (req, res, next) => {
    res.json({});
}