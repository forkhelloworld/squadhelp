const express = require('express')
const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const contestRouter = require('./contestRouter')
const rootRouter = express.Router()

rootRouter.use(userRouter)
rootRouter.use(chatRouter)
rootRouter.use(contestRouter)

module.exports = rootRouter
