"use strict";
const express = require('express');
const userRouter = require('./userRoutes');
const blogRouter = require('./blogRoute');
const mainRouter = express.Router();
mainRouter.use('/', userRouter);
mainRouter.use('/', blogRouter);
module.exports = mainRouter;
