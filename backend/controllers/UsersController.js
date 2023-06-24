import { QueryTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

class UsersController {
  constructor() {
    this._fetchUsers()
      .then(data => this.users = data)
      .catch(error => console.log(error))
  }

  async _fetchUsers() {
    const suitableUsers = await sequelize.query("SELECT login FROM docflow_users", { type: QueryTypes.SELECT })
    const users = suitableUsers.map(u => u.login)
    return users
  }

  getSuitableUsers(q) {
    return this.users.filter(u => u.toLowerCase().match(q.toLowerCase()))
  }
}

export default new UsersController()