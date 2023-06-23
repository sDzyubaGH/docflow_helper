import {useDispatch, useSelector} from "react-redux"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"
import {useEffect} from "react"
import {fetchTasks} from "./store/tasksSlice"
import TasksExtraData from "./components/TasksExtraData"

function App() {
  // const dispatch = useDispatch()

  // const tasks = useSelector((state) => state.tasks.tasks)

  // useEffect(() => {
  //   dispatch(fetchTasks())
  // }, [dispatch])

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex overflow-auto">
        <Sidebar />
        <div className="overflow-auto w-5/6">
          {/* {tasks.length ? <TasksExtraData /> : <></>} */}
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default App
