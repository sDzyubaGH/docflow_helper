import React from "react"
import Task from "./Task"
import Loader from "./UI/Loader"
import {useSelector} from "react-redux"

export default function Tasks() {
  const {tasks, loading, error, fetchResult} = useSelector((state) => state.tasks)
  const {secondName} = useSelector((state) => state.queryParams)
  const tasksType = useSelector((state) => state.filterParams.tasksType)

  if (loading) {
    return <Loader />
  }

  const filteredTasks = tasksType === "all" ? tasks : tasks.filter((task) => task.task_type === tasksType)

  return (
    <div className="overflow-auto">
      <table className="w-full">
        {error && <p className="text-red-500">{error.message}</p>}
        <thead className="border-b ">
          <tr className="sticky left-0 top-0 bg-white">
            <th>Дата постановки</th>
            <th className="w-[200px]">Номер документа</th>
            <th className="py-2 w-[200px]">Статус задачи</th>
            <th className="w-[500px]">Текст задачи</th>
            <th>Исходная дата документа</th>
            <th>Дата рег. в канцелярии</th>
            <th>Срок исполнения</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && fetchResult && fetchResult === "empty" && !error && (
        <>Нет результатов. Возможно, фамилия введена с ошибкой</>
      )}
      {tasks.length === 0 && !secondName && !fetchResult && !error && <>Введите фамилию сотрудника и нажмите "Показать"</>}
    </div>
  )
}
