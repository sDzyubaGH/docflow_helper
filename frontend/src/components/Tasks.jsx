import React, {useEffect, useState} from "react"
import Task from "./Task"
import Loader from "./UI/Loader"
import {useDispatch, useSelector} from "react-redux"
import {fetchTasks} from "../store/tasksSlice"

export default function Tasks() {
  const {tasks, loading, error} = useSelector((state) => state.tasks)

  if (loading) {
    return <Loader />
  }

  return (
    <table className="w-full">
      {/* {error && <p className="text-red-500">{error.message}</p>} */}
      <thead className="border-b">
        <tr>
          <th className="py-2">id</th>
          <th>content</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  )
}
