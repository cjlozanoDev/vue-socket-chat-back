class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    const user = {id, name, room}
    this.users.push(user)

    return this.users
  }

  getPeopleOfRoom() {
    const peopleOfRoom = this.users
    return peopleOfRoom
  }

  deleteUser(id) {
    const indexUser = this.users.findIndex(user => user.id === id)
    if(!indexUser) {
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