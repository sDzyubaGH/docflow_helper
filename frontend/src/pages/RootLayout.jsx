import Sidebar from "../components/Sidebar"
import {Outlet} from "react-router-dom"

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex overflow-auto">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
