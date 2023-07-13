import React from "react"
import {Link} from "react-router-dom"
import pages from "../utils/pages"

export default function Navigation({currentPage, setCurrentPage}) {
  console.log(currentPage)
  return (
    <div className="w-full flex">
      <Link
        onClick={() => setCurrentPage(pages.tasks)}
        className={`w-full block p-1 text-center border-b ${
          currentPage === pages.tasks ? "border-b border-blue-600 text-blue-600" : ""
        }`}
        to={pages.tasks}
      >
        Задачи
      </Link>
      <Link
        onClick={() => setCurrentPage(pages.documents)}
        className={`w-full block p-1 text-center border-b ${
          currentPage === pages.documents ? "border-b-blue-600 text-blue-600" : ""
        }`}
        to={pages.documents}
      >
        Документы
      </Link>
    </div>
  )
}
