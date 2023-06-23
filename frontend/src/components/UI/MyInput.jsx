import React from "react"

export default function MyInput({label, placeholder, onChange, value, type, className, required}) {
  const changeHandle = (e) => {
    onChange && onChange(e.target.value)
  }
  return (
    <div className={className}>
      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        onChange={changeHandle}
        type={type}
        id="first_name"
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
