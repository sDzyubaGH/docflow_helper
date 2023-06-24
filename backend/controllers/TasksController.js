import { QueryTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import SQLBuilder from "./SQLBuilder.js";
import * as XLSX from "xlsx";
import { unlinkSync } from 'fs'
import UsersController from "./UsersController.js";

class TasksController {
  async get(req, res, next) {
    try {
      const { secondName, dateFrom, dateTo } = req.query
      const sql = SQLBuilder.buildGetTasksSql({ secondName, dateFrom, dateTo })
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT })
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }

  async getDocflowUsers(req, res, next) {
    try {
      const { q } = req.query
      const users = UsersController.getSuitableUsers(q)

      // полностью совпадает
      for (const u of users) {
        if (u.toLowerCase() === q.toLowerCase()) {
          return res.status(200).send([])
        }
      }

      res.status(200).send(users)
    } catch (error) {
      console.log(error)
    }
  }

  async download(req, res, next) {
    try {
      const { secondName, dateFrom, dateTo } = req.query
      if (!secondName) {
        return res.status(200).json({})
      }
      const sql = SQLBuilder.buildGetTasksSql({ secondName, dateFrom, dateTo })
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT })

      if (!result) {
        return res.status(200).json([])
      }

      const data = [
        ['Номер документа', "Статус задачи", "Текст задачи", "Исходная дата документа", "Дата регистрации канцелярии", "Срок исполнения", "Дата постановки"],
        ...result.map(row => [row.number_source, row.task_type, row.task_text, row.date_source, row.date_received, row.terms, row.date_route])
      ]

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      // Сохранение файла на сервере
      const filePath = `./${secondName}.xlsx`;
      // const filePath = join('..', 'tmp_files', `${secondName}_tasks.xlsx`)
      XLSX.writeFile(workbook, filePath);

      // res.set('Content-Disposition', `attachment; filename="${secondName}.xlsx"`);
      return res.download(filePath, (error) => {
        if (error) {
          // Обработка ошибки
          console.error('Ошибка при скачивании файла:', error);
        } else {
          // Удаление файла после скачивания
          unlinkSync(filePath);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TasksController()