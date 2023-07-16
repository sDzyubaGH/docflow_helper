import { QueryTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

class UsersController {
  users = []
  objects = []
  constructor() {
    this._fetchUsers()
      .then(data => this.users = data)
      .catch(error => console.log(error))

    this._fetchObjcect()
      .then(data => this.objects = data)
      .catch(error => console.log(error))
  }

  async _fetchUsers() {
    try {
      const suitableUsers = await sequelize.query("SELECT id, login as name FROM docflow_users", { type: QueryTypes.SELECT })
      // const users = suitableUsers.map(u => u.login)
      return suitableUsers
    } catch (error) {
      console.log(error)
    }
  }

  getSuitableUsers(q) {
    if (!q || !this.users.length) return null
    return this.users.filter(u => u.name.toLowerCase().match(q.toLowerCase()))
  }

  async _fetchObjcect() {
    try {
      const allObjects = await sequelize.query("SELECT Count_Objects as id, ShortName_Object as name FROM Objects_Attributes", { type: QueryTypes.SELECT })
      return allObjects
    } catch (error) {
      console.log(error)
    }
  }

  getSuitableObjects(q) {
    if (!q || !this.users.length) return null
    return this.objects.filter(o => o.name.toLowerCase().match(q.toLowerCase()))
  }
}

export default new UsersController()