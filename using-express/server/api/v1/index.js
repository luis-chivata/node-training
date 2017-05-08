"use strict";

const router = require("express").Router();

const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories.js");
const postsRoutes = require("./routes/posts");

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;