import React from "react"

export default function MyButton({children, onClick, disabled, className}) {
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <button
      onClick={handleClick}
      // className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      className={`w-full block px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 ${
        className ? className : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
