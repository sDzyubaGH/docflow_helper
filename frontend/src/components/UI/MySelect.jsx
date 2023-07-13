import React from "react"

export default function MySelect({options, ...props}) {
  return (
    <ul className="w-full">
      {options?.map((o) => (
        <li key={o}>{o}</li>
      ))}
    </ul>
  )
}
