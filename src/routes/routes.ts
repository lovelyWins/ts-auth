const express = require('express')
const userRouter  = require('./userRoutes')
const mainRouter = express.Router()

mainRouter.use('/',userRouter)

module.exports = mainRouter