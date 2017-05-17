"use strict";

const logger = require("winston");
const _ = require("lodash");

const Category = require("./../schemas/categories");

exports.all = (req, res, next) => {
    Category.find()
        .then( categories => {
            res.json(categories);
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.post = (req, res, next) => {
    let body = req.body;
    let newCategory = new Category(body);
    newCategory.save()
        .then( category => {
            res.json(category);
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.get = (req, res, next) => {
    const id = req.params.id

    Category.findById(id)
        .then( category => {
            res.json(category);
        })
        .catch( err => {
            res.json({
                "message": "User not found"
            });
        });
}

exports.put = (req, res, next) => {
    const body = req.body;
    const category = _.merge(req.category,body);

    category.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const category = req.category;

    category.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(new Error(err));
        });
};