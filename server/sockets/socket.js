const { io } = require('../server')

io.on('connection', (client) => {
  console.log('Usuario conectado')
})