import { QueryTypes } from "sequelize";
import { sequelize } from "../sequelize.js";
import SQLBuilder from "./SQLBuilder.js";
import UsersController from "./UsersController.js";
import Excel from 'exceljs'

class DocumentsController {
  async get(req, res, next) {
    try {
      const { sender, dateFrom, dateTo, categories } = req.query
      const sql = SQLBuilder.buildGetDocumentsSql({ sender, dateFrom, dateTo, categories })
      const result = await sequelize.query(sql, { type: QueryTypes.SELECT })
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }

  async getCategories(req, res, next) {
    try {
      const result = await sequelize.query(`SELECT * from docflow_documents_categories`, { type: QueryTypes.SELECT })
      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }

  async getSenders(req, res, next) {
    try {
      const { q } = req.query
      const suitableObjects = UsersController.getSuitableObjects(q)

      // полностью совпадает
      for (const o of suitableObjects) {
        if (o.toLowerCase() === q.toLowerCase()) {
          return res.status(200).send([])
        }
      }

      res.status(200).send(suitableObjects)
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

      const workbook = new Excel.Workbook()

      const worksheet = workbook.addWorksheet('Test')

      const headers = [
        { key: 'date_route', header: 'Дата постановки', width: 16 },
        { key: 'number_source', header: 'Номер документа', width: 21 },
        { key: 'task_type', header: 'Статус задачи', width: 15 },
        { key: 'task_text', header: 'Текст задачи', width: 55 },
        { key: 'date_source', header: 'Исходная дата документа', width: 25 },
        { key: 'date_received', header: 'Дата регистрации в канцелярии', width: 30 },
        { key: 'terms', header: 'Срок исполнения', width: 17 }
      ]

      worksheet.columns = headers
      let count = 1
      for (const row of result) {
        let handledTaskText = row.task_text

        handledTaskText = handledTaskText?.replace(/\&lt;br \/\&gt;|<br \/>/g, '\n')

        worksheet.addRow({
          date_route: row.date_route || '',
          number_source: row.number_source || '',
          task_type: row.task_type || '',
          task_text: handledTaskText || '',
          date_source: row.date_source || '',
          date_received: row.date_received || '',
          terms: row.terms || ''
        })


        worksheet.getCell(`A${count}`).alignment = { horizontal: 'center', vertical: 'middle' }
        worksheet.getCell(`B${count}`).alignment = { horizontal: 'center', vertical: 'middle' }
        worksheet.getCell(`C${count}`).alignment = { wrapText: true }
        worksheet.getCell(`D${count}`).alignment = { horizontal: 'center', vertical: 'middle' }
        worksheet.getCell(`E${count}`).alignment = { horizontal: 'center', vertical: 'middle' }
        worksheet.getCell(`F${count}`).alignment = { horizontal: 'center', vertical: 'middle' }
        worksheet.getCell(`G${count}`).alignment = { horizontal: 'center', vertical: 'middle' }

        count++
      }

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx');

      workbook.xlsx.write(res)
        .then(() => console.log('File write done'))
        .catch(err => console.log(err))
        .finally(() => res.end())

      // const data = [
      //   ['Номер документа', "Статус задачи", "Текст задачи", "Исходная дата документа", "Дата регистрации канцелярии", "Срок исполнения", "Дата постановки"],
      //   ['Номер документа', "Статус задачи", "Текст задачи", "Исходная дата документа", "Дата регистрации канцелярии", "Срок исполнения", "Дата постановки"],
      //   // ...result.map(row => [row.number_source || '', row.task_type || '', row.task_text || '', row.date_source || '', row.date_received || '', row.terms || '', row.date_route || ''])
      // ]

      // const worksheet = XLSX.utils.aoa_to_sheet(data);
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      // // Сохранение файла на сервере
      // const filePath = `./${secondName}.xlsx`;
      // // const filePath = join('..', 'tmp_files', `${secondName}_tasks.xlsx`)
      // const buffer = XLSX.writeFile(workbook, filePath);

      // // res.set('Content-Disposition', `attachment; filename="${secondName}.xlsx"`);
      // return res.download(filePath, (error) => {
      //   if (error) {
      //     // Обработка ошибки
      //     console.error('Ошибка при скачивании файла:', error);
      //   } else {
      //     // Удаление файла после скачивания
      //     unlinkSync(filePath);
      //   }
      // });
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DocumentsController()