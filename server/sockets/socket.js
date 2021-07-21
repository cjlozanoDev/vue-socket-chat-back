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
    client.join(data.room)
      
    users.addUser(client.id, data.name, data.room)
  
    console.log('Ha entrado en la sala', data)
    

    client.broadcast.to(data.room).emit('listUsers', users.getPeopleOfRoom(data.room))
    client.broadcast.to(data.room).emit('createMessage', createMessage('Administrador', `${data.name} entró en la sala`))
    callBack(users.getPeopleOfRoom(data.room))
  })

  client.on('disconnect', () => {
    const userDeleted = users.deleteUser(client.id)
    if(userDeleted) {
      console.log('Se ha borrado al usuario', userDeleted)
      client.broadcast.to(userDeleted.room).emit('createMessage', createMessage('Administrador', `${userDeleted.name} salió de la sala`))
      client.broadcast.to(userDeleted.room).emit('listUsers', users.getPeopleOfRoom(userDeleted.room))
    }
  })

  client.on('createMessage', (data, callBack) => {
    const user = users.getUser(client.id)
    const message = createMessage(user.name, data.message)
  
    client.broadcast.to(user.room).emit('createMessage', message)
    callBack(message)

  })

})