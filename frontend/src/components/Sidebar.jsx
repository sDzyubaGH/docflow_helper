import React from "react"
import MyInput from "./UI/MyInput"
import MyButton from "./UI/MyButton"
import {useDispatch, useSelector} from "react-redux"
import {fetchTasks} from "../store/tasksSlice"
import {setSecondName, setDateFrom} from "../store/queryParamsSlice"

export default function Sidebar() {
  const {secondName, dateFrom, dateTo} = useSelector((state) => state.queryParams)
  const dispatch = useDispatch()

  const changeFIOHandler = (fio) => {
    dispatch(setSecondName(fio))
  }

  const changeDateFromHandler = (dFrom) => {
    dispatch(setDateFrom(dFrom))
  }

  // const changeDateToHandler = (dTo) => {
  //   dispatch(setDateTo(dTo))
  // }

  const showResults = () => {
    dispatch(fetchTasks({secondName, dateFrom, dateTo}))
  }

  const downloadXLSX = () => {}

  return (
    <div className="w-1/6 border-r flex flex-col gap-6 p-4 h-screen">
      <div>
        <MyInput
          required={true}
          type="text"
          value={secondName}
          onChange={changeFIOHandler}
          label="Фамилия"
          placeholder="Иванов"
        />
      </div>
      <div className="flex gap-2">
        <MyInput type="date" value={dateFrom} onChange={changeDateFromHandler} label="От" />
        {/* <MyInput type="date" className="w-1/2" value={dateTo} onChange={changeDateToHandler} label="До" /> */}
      </div>
      <div className="btns flex gap-4 flex-wrap">
        <div>
          <MyButton onClick={showResults}>Показать</MyButton>
        </div>
        <div>
          <MyButton onClick={downloadXLSX}>Скачать .xlsx</MyButton>
        </div>
      </div>
    </div>
  )
}
