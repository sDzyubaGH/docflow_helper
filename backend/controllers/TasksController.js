import { QueryTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import SQLBuilder from "./SQLBuilder.js";
import * as XLSX from "xlsx";

class TasksController {
  async get(req, res, next) {
    try {
      const { secondName, dateFrom, dateTo } = req.query
      const sql = SQLBuilder.buildSqlTasksStatistic({ secondName, dateFrom })
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT })
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }

  async download(req, res, next) {
    try {
      const { secondName, dateFrom } = req.query
      const sql = SQLBuilder.buildSqlTasksStatistic({ secondName, dateFrom })
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT })

      const toXLSXArray = result.map(row => {
        return []
      })
      const data = [
        ['Номер документа', "Статус задачи", "Текст задачи", "Исходная дата документа", "Дата регистрации канцелярии", "Срок исполнения", "Дата постановки"],

      ]

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      // Сохранение файла на сервере
      const filePath = `../files_tmp/${secondName}_tasks.xlsx`;
      XLSX.writeFile(workbook, filePath);

      res.download(filePath, `${secondName}_tasks.xlsx`, (error) => {
        if (error) {
          // Обработка ошибки
          console.error('Ошибка при скачивании файла:', error);
        } else {
          // Удаление файла после скачивания
          fs.unlinkSync(filePath);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TasksController()