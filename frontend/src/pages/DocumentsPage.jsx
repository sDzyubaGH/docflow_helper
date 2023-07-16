import React from "react"
import DocumentsTable from "../components/DocumentsTable"

export default function DocumentsPage() {
  return (
    <div className="w-5/6 overflow-auto flex flex-col">
      <DocumentsTable />
    </div>
  )
}
