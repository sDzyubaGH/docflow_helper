import React from 'react'
import DocumentItem from './DocumentItem'
import { useSelector } from 'react-redux'

export default function DocumentsTable() {
  const documents = useSelector(state => state.documents.documents)
  return (
    <div className="overflow-auto">
      <table className="w-full">
        {/* {error && <p className="text-red-500">{error.message}</p>} */}
        <thead className="border-b ">
          <tr className="sticky left-0 top-0 bg-white">
            <th className="w-[200px]">Номер документа</th>
            <th className="w-[200px]">Исходная дата документа</th>
            <th>Дата отправки</th>
            <th>Категории</th>
          </tr>
        </thead>
        <tbody>
          {documents?.map((doc) => (
            <DocumentItem key={doc.id} document={doc} />
          ))}
        </tbody>
      </table>
      {/* {tasks.length === 0 && fetchResult && fetchResult === "empty" && !error && (
        <>Нет результатов. Возможно, фамилия введена с ошибкой или задач нет</>
      )} */}
      {/* {tasks.length === 0 && !secondName && !fetchResult && !error && <>Введите фамилию сотрудника и нажмите "Показать"</>} */}
    </div>
  )
}
