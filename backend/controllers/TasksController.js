import { QueryTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

class TasksController {
  async get(req, res, next) {
    try {
      const result = await sequelize.query('SELECT * FROM docflow_documents limit 100', { type: QueryTypes.SELECT })
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TasksController()