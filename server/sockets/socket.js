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
    client.broadcast.emit('listUsers', users.getPeopleOfRoom())
    callBack(users.getPeopleOfRoom())
  })

  client.on('disconnect', () => {
    const userDeleted = users.deleteUser(client.id)
    if(userDeleted) {
      console.log('Se ha borrado al usuario', userDeleted)
      client.broadcast.emit('createMessage', `${userDeleted.name} salió de la sala`)
      client.broadcast.emit('listUsers', users.getPeopleOfRoom())
    }
  })

})