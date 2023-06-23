import React from "react"
import {localeDate} from "../utils/functions"

export default function Task({task}) {
  return (
    <tr className="border-b">
      <td className="text-center py-2">{task?.number_source || "–"}</td>
      <td className="text-center whitespace-nowrap">{task?.task_type || "–"}</td>
      <td className="text-left w-[500px]">{task?.task_text || "–"}</td>
      <td className="text-center">{localeDate(task?.date_source) || "–"}</td>
      <td className="text-center">{localeDate(task?.date_received) || "–"}</td>
      <td className="text-center">{localeDate(task?.terms) || "–"}</td>
      <td className="text-center">{localeDate(task?.date_route) || "–"}</td>
    </tr>
  )
}
