const express = require('express')
const cors = require('cors')
const router = require('./router')
const handlerError = require('./handlerError/handler')
const path = require('path')

const app = express()
const staticPath = path.resolve(__dirname, '..', '..', '..', 'public/images')

app.use(cors())
app.use(express.json())
app.use('/public/images', express.static(staticPath))
app.use(router)
app.use(handlerError)

module.exports = app
