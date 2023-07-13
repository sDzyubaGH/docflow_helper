import React from "react"
import {useSelector} from "react-redux"
import Options from "../components/Options"
import Tasks from "../components/Tasks"

export default function TasksPage() {
  const tasks = useSelector((state) => state.tasks.tasks)

  return (
    <div className="w-5/6 overflow-auto flex flex-col">
      {tasks.length ? <Options /> : <></>}
      <div className="overflow-auto">
        <Tasks />
      </div>
      {/* {tasks.length ? <TasksExtraData /> : <></>} */}
    </div>
  )
}
