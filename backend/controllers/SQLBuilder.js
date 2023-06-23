export default class SQLBuilder {
  // constructor({ query = "", conditions = null, limits = null, offset = null }) {

  // }

  static buildSqlTasksStatistic({ secondName, dateFrom }) {
    let sql = `select ddt.id, ddt.task_type, ddt.task_text, ddt.terms, ddt.date_route, dd.number_source, dd.date_received, dd.date_source  from docflow_documents_task ddt
    left join docflow_documents dd on ddt.doc_id = dd.id
    where ddt.performer = (select DISTINCT id from docflow_users du where login = '${secondName}')
    and ddt.id not in (select parent_id from docflow_documents_task ddt where parent_id in (select id from docflow_documents_task ddt where performer = (select DISTINCT id from docflow_users du where login = '${secondName}')))
    and date_route > '${dateFrom}';`

    return sql
  }
}