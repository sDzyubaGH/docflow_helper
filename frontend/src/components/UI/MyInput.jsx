import React from "react"

export default function MyInput({label, placeholder, value, type, required, ...props}) {
  return (
    <div className={props?.className}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        // {...props}
        onChange={props?.onChange}
        onKeyDown={props?.onKeyDown}
        type={type}
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
