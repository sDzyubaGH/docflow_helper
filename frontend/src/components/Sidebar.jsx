import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import pages from "../utils/pages"
import {useDispatch, useSelector} from "react-redux"
import Navigation from "./Navigation"
import TasksParams from "./TasksParams"
import DocumentsParams from "./DocumentsParams"

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname)

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === "/") {
      setCurrentPage("/tasks")
      navigate("/tasks")
    }
  }, [navigate])

  return (
    <div className="w-1/6 border-r h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === pages.tasks && <TasksParams />}
      {currentPage === pages.documents && <DocumentsParams />}
    </div>
  )
}
