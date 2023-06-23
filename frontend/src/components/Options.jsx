import React from 'react'
import MyRadio from './UI/MyRadio'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksType } from '../store/filterParamsSlice'

export default function Options() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)
  const tasksType = useSelector(state => state.filterParams.tasksType)

  const radioClickHandle = (e) => {
    dispatch(setTasksType(e.target.value))
  }

  const filteredTasks = tasksType === 'all' ? tasks : tasks.filter(task => task.task_type === tasksType)

  const amount = filteredTasks.length

  return (
    <div className='py-2 px-4 flex flex-col gap-4'>
      <div className='flex gap-4'>
        <MyRadio onChange={radioClickHandle} id='all' name='taskType' label='Все' value='all' />
        <MyRadio onChange={radioClickHandle} id='finished' name='taskType' label='Только закрытые' value='Задача закрыта' />
        <MyRadio onChange={radioClickHandle} id='unfinished' name='taskType' label='Только незакрытые' value='Задача' />
      </div>
      <div className='stats'>
        Всего: {amount}
      </div>
    </div>
  )
}
