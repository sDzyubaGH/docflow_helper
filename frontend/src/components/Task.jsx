import React from "react"

export default function Task({task}) {
  return (
    <tr className="border-b">
      <td className="text-center py-2">{task?.id}</td>
      <td className="text-left">{task?.content || "Нет контента"}</td>
    </tr>
  )
}
