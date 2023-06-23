import React from 'react'
import { useSelector } from 'react-redux'

export default function MyRadio({ label, name, id, onChange, value }) {
  const tasksType = useSelector(state => state.filterParams.tasksType)
  return (
    <div className="flex items-center">
      <input onChange={onChange} checked={tasksType === value ? true : false} id={id} type="radio" value={value} name={name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
    </div>
  )
}
