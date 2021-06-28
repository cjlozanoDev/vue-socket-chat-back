const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const port = process.env.PORT || 3000
module.exports.io = require('socket.io')(httpServer, {
  cors: {
    origin: true,
    credentials: true
  },
  allowEIO3: true
})

require('./sockets/socket.js')

httpServer.listen(port, err => {
  if(err) throw new Error(err)

  console.log(`Servidor corriendo en puerto ${ port }`)
})