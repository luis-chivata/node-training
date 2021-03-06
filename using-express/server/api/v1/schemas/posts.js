"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "category"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('post', PostSchema);