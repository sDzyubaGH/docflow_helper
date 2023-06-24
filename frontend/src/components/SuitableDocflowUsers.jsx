import React from 'react'
import { useDispatch } from 'react-redux'
import { setSecondName } from '../store/queryParamsSlice'

export default function SuitableDocflowUsers({ setSuitableUsers, suitableUsers }) {
  const dispatch = useDispatch()

  const selectUserHandler = (user) => {
    dispatch(setSecondName(user))
    setSuitableUsers([])
  }

  return (
    <ul className='p-2 rounded border max-h-[300px] w-full overflow-auto'>
      {
        suitableUsers.map(user =>
          <li
            className='hover:bg-blue-500 hover:text-white rounded p-1 last-of-type:border-none border-b'
            onClick={() => selectUserHandler(user)}
            key={user}>
            {user}
          </li>)
      }
    </ul>
  )
}
