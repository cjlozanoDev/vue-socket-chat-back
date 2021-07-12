const { io } = require('../server')
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utils')

const users = new Users()

io.on('connection', (client) => {
  console.log('Usuario conectado')

  client.on('entryChat', (data, callBack) => {
    console.log('ha entrado en la sala', data)
    if(!data.name || !data.room) {
      return callBack({
        error: true,
        message: 'EL nombre/sala es necesario'
      })
    }
    users.addUser(client.id, data.name, data.room)
  
    console.log('Ha entrado en la sala', data)
  
    client.broadcast.emit('listUsers', users.getPeopleOfRoom())
    client.broadcast.emit('createMessage', createMessage('Administrador', `${data.name} entró en la sala`))
    callBack(users.getPeopleOfRoom())
  })

  client.on('disconnect', () => {
    const userDeleted = users.deleteUser(client.id)
    if(userDeleted) {
      console.log('Se ha borrado al usuario', userDeleted)
      client.broadcast.emit('createMessage', createMessage('Administrador', `${userDeleted.name} salió de la sala`))
      client.broadcast.emit('listUsers', users.getPeopleOfRoom())
    }
  })

  client.on('createMessage', (data, callBack) => {
    const user = users.getUser(client.id)
    const message = createMessage(user.name, data.message)
  
    client.broadcast.emit('createMessage', message)
    callBack(message)

  })

})