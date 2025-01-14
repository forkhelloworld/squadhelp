const http = require('http')
const express = require('express')
const cors = require('cors')
require('./dbMongo/mongoose')
const router = require('./router')
const controller = require('./socketInit')
const path = require('path')
const handlerError = require('./handlerError/handler')

const PORT = process.env.PORT || 3000
const app = express()

const staticPath = path.resolve(__dirname, '..', '..', '..', 'public/images')

app.use(cors())
app.use(express.json())
app.use('/public/images', express.static(staticPath))
app.use(router)
app.use(handlerError)

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
controller.createConnection(server)
