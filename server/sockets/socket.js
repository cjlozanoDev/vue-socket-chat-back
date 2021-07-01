const { io } = require('../server')
const { Users } = require('../classes/users')

const users = new Users()

io.on('connection', (client) => {
  console.log('Usuario conectado')

  client.on('entryChat', (data, callBack) => {
    if(!data.name || !data.room) {
      return callBack({
        error: true,
        message: 'EL nombre/sala es necesario'
      })
    }
    users.addUser(client.id, data.name, data.room)

    callBack(users.getPeopleOfRoom())
  })
})