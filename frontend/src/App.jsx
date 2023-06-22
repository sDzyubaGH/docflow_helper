import {useDispatch} from "react-redux"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"
import MyInput from "./components/UI/MyInput"
import {useEffect} from "react"
import {fetchTasks} from "./store/tasksSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex overflow-auto">
        <Sidebar />
        <div className="overflow-auto w-5/6">
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default App
