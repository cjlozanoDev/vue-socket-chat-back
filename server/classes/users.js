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
}

module.exports = {
  Users
}