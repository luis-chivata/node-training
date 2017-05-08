"use strict";

const router = require("express").Router();
const logger = require("winston");

const controller = require("./../controllers/users");

router.route("/")
    .get(controller.all)
    .post(controller.post);

router.route("/:id")
    .get(controller.get)
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;