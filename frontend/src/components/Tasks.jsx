import React, {useEffect, useState} from "react"
import Task from "./Task"
import Loader from "./UI/Loader"
import {useDispatch, useSelector} from "react-redux"

export default function Tasks() {
  const {tasks, loading, error, fetchResult} = useSelector((state) => state.tasks)
  const {secondName} = useSelector((state) => state.queryParams)

  if (loading) {
    return <Loader />
  }

  // if (tasks.length === 0 && secondName) {
  //   return <>Нет результатов. Возможно, фамилия введена с ошибкой</>
  // }

  console.log(tasks, secondName, fetchResult)

  return (
    <>
      <table className="w-full">
        {error && <p className="text-red-500">{error.message}</p>}
        <thead className="border-b table-fixed">
          <tr className="sticky left-0 top-0 bg-white">
            <th>Номер документа</th>
            <th className="py-2">Статус задачи</th>
            <th>Текст задачи</th>
            <th>Исходная дата документа</th>
            <th>Дата рег. в канцелярии</th>
            <th>Срок исполнения</th>
            <th>Дата постановки</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && fetchResult && fetchResult === "empty" && <>Нет результатов. Возможно, фамилия введена с ошибкой</>}
      {tasks.length === 0 && !secondName && !fetchResult && <>Введите фамилию сотрудника и нажмите "Показать"</>}
    </>
  )
}
