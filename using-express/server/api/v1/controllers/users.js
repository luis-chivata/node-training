"use strict";

const logger = require("winston");
const _ = require("lodash");

const User = require("./../schemas/users");

exports.all = (req, res, next) => {
    User.find()
        .then( users => {
            res.json(users);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.post = (req, res, next) => {
    let body = req.body;
    let newUser = new User(body);
    newUser.save()
        .then( user => {
            res.json(user);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.get = (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then( user => {
            if(user) {
                res.json(user);
            } else {
                res.json({
                    "message": "User not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.put = (req, res, next) => {
    const body = req.body;
    const user = _.merge(req.user, body);

    user.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const user = req.user;

    user.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(err);
        });
};