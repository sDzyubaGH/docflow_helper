import React from "react"
import {Link} from "react-router-dom"
import pages from "../utils/pages"

export default function Navigation({currentPage, setCurrentPage}) {
  return (
    <div className="w-full flex">
      <Link
        onClick={() => setCurrentPage(pages.tasks)}
        className={`w-full block p-1 text-center border-b ${
          currentPage === pages.tasks ? "bg-blue-500 text-white border-b-blue-500" : ""
        }`}
        to={pages.tasks}
      >
        Задачи
      </Link>
      <Link
        onClick={() => setCurrentPage(pages.documents)}
        className={`w-full block p-1 text-center border-b ${
          currentPage === pages.documents ? "bg-blue-500 text-white border-b-blue-500" : ""
        }`}
        to={pages.documents}
      >
        Документы
      </Link>
    </div>
  )
}
