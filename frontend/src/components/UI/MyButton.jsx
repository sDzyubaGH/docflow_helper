import React from "react"

export default function MyButton({children, onClick}) {
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <button
      onClick={handleClick}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      {children}
    </button>
  )
}
