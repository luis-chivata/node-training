"use strict";

const logger = require("winston");
const _ = require("lodash");

const Post = require("./../schemas/posts");

exports.params = (req, red, next, id) => {
    Post.findById(id)
        .populate("author categories")
        .exec()
        .then( post => {
            if( post ) {
                req.post = post;
                next();
            } else {
                res.json({
                    "message": "Post not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.all = (req, res, next) => {
    Post.find()
        .populate("author categories")
        .exec()
        .then( posts => {
            res.json(posts);
        })
        .catch( err => {
            next( new Error(err));
        })
};

exports.post = (req, res, next) => {
    let body = req.body;

    let newPost = new Post(body);
    newPost.save()
        .then( post => {
            res.json(post);
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.get = (req, res, next) => {
    const id = req.params.id;

    Post.findById(id)
        .then( post => {
            if(post) {
                res.json(post);
            } else {
                res.json({
                    "message": "post not found"
                });
            }
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.put = (req, res, next) => {
    const body = req.body;
    const post = _.merge(req.post, body);

    post.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next( new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const post = req.post;

    post.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(new Error(err));
        });
};