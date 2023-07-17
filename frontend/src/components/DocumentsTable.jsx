import React from "react"
import DocumentItem from "./DocumentItem"
import {useSelector} from "react-redux"
import Loader from "./UI/Loader"

export default function DocumentsTable() {
  const {documents, loading, error} = useSelector((state) => state.documents)
  return (
    <>
      <table className="w-full">
        {error && <p className="text-red-500">{error.message}</p>}
        <thead className="border-b ">
          <tr className="sticky left-0 top-0 bg-white">
            <th className="w-[200px]">Номер документа</th>
            <th className="w-[250px] py-1">Исходная дата документа</th>
            <th>Дата отправки</th>
            <th>Категории</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <Loader /> : <></>}
          {documents?.map((doc) => (
            <DocumentItem key={doc.id} document={doc} />
          ))}
        </tbody>
      </table>
      {/* {tasks.length === 0 && fetchResult && fetchResult === "empty" && !error && (
        <>Нет результатов. Возможно, фамилия введена с ошибкой или задач нет</>
      )} */}
      {/* {tasks.length === 0 && !secondName && !fetchResult && !error && <>Введите фамилию сотрудника и нажмите "Показать"</>} */}
    </>
  )
}
