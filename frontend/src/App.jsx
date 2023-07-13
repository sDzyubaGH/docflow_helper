import { useSelector } from "react-redux"
import Options from "./components/Options"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex overflow-auto">
        <Sidebar />
        
      </div>
    </div>
  )
}

export default App
