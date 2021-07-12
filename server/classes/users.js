class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user)
    console.log('hola, he entrado')
  }

  getPeopleOfRoom() {
    const peopleOfRoom = this.users
    return peopleOfRoom
  }

  getUser(id) {
    const person = this.users.find(user => user.id === id)
    return person
  }

  deleteUser(id) {
    const indexUser = this.users.findIndex(user => user.id === id)
  
    if(indexUser === -1) {
      return null
    }
    const userAux = this.users[indexUser]
    this.users.splice(indexUser, 1)

    return userAux
  }
}

module.exports = {
  Users
}