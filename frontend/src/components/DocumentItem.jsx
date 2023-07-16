import React from "react"
import { getCategories, handleSpecSymbols, localeDate } from "../utils/functions"
import { localeTaskStatus } from "../../../backend/utils/functions"
import { useSelector } from "react-redux"

export default function DocumentItem({ document }) {
  const categories = useSelector(state => state.documentsParams.categories)
  return (
    <tr className="border-b">
      <td className="text-center">{document?.docNumber || "–"}</td>
      <td className="text-center">{localeDate(document?.docDate) || "–"}</td>
      <td className="text-center">{localeDate(document?.receiveDate) || "–"}</td>
      <td className="text-center">{getCategories(document?.categories, categories) || "–"}</td>
    </tr>
  )
}
