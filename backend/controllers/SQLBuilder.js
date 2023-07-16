export default class SQLBuilder {
  static buildGetTasksSql({ secondName, dateFrom, dateTo }) {
    let sql = `select ddt.id, ddt.task_type, ddt.task_text, ddt.terms, ddt.date_route, dd.number_source, dd.date_received, dd.date_source  from docflow_documents_task ddt
    left join docflow_documents dd on ddt.doc_id = dd.id
    where ddt.performer = (select DISTINCT id from docflow_users du where login = '${secondName}')
    and ddt.id not in (select parent_id from docflow_documents_task ddt where parent_id in (select id from docflow_documents_task ddt where performer = (select DISTINCT id from docflow_users du where login = '${secondName}')))`
    if (dateFrom && !dateTo) {
      const condition = ` and date_route > '${dateFrom}'`
      sql += condition
    }
    if (!dateFrom && dateTo) {
      const condition = ` and date_route < '${dateTo}'`
      sql += condition
    }
    if (dateFrom && dateTo) {
      const condition = ` and date_route BETWEEN '${dateFrom}' AND '${dateTo}'`
      sql += condition
    }

    return sql
  }

  static buildGetDocumentsSql({ senderId, dateFrom, dateTo, categories }) {
    let sql = `SELECT dd.id, dd.number_source as docNumber, dd.date_source as docDate, dd.date_received as receiveDate, dd.categories 
    FROM docflow_documents dd  
    WHERE sender = '${senderId}'`

    if (dateFrom && !dateTo) {
      const condition = ` AND date_route > '${dateFrom}'`
      sql += condition
    }
    if (!dateFrom && dateTo) {
      const condition = ` AND date_route < '${dateTo}'`
      sql += condition
    }
    if (dateFrom && dateTo) {
      const condition = ` AND date_route BETWEEN '${dateFrom}' AND '${dateTo}'`
      sql += condition
    }
    return sql
  }
}