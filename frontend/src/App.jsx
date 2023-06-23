import { useSelector } from "react-redux"
import Options from "./components/Options"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"

function App() {
  const tasks = useSelector(state => state.tasks.tasks)
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex overflow-auto">
        <Sidebar />
        <div className="w-5/6 overflow-auto flex flex-col">
          {tasks.length ? <Options /> : <></>}
          <div className="overflow-auto">
            <Tasks />
          </div>
          {/* {tasks.length ? <TasksExtraData /> : <></>} */}
        </div>
      </div>
    </div>
  )
}

export default App
