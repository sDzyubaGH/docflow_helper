import { QueryTypes } from "sequelize"
import { sequelize } from "../sequelize.js"

class UsersController {
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
      const suitableUsers = await sequelize.query("SELECT login FROM docflow_users", { type: QueryTypes.SELECT })
      const users = suitableUsers.map(u => u.login)
      return users
    } catch (error) {
      console.log(error)
    }
  }

  getSuitableUsers(q) {
    if (!q) return null
    return this.users.filter(u => u.toLowerCase().match(q.toLowerCase()))
  }

  async _fetchObjcect() {
    try {
      const allObjects = (await sequelize.query("SELECT ShortName_Object FROM Objects_Attributes", { type: QueryTypes.SELECT })).map(o => o.ShortName_Object)
      return allObjects
    } catch (error) {
      console.log(error)
    }
  }

  getSuitableObjects(q) {
    if (!q) return null
    return this.objects.filter(o => o.toLowerCase().match(q.toLowerCase()))
  }
}

export default new UsersController()