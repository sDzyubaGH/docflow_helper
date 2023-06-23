import React from "react"
import MyInput from "./UI/MyInput"
import MyButton from "./UI/MyButton"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks } from "../store/tasksSlice"
import { setSecondName, setDateFrom, setDateTo } from "../store/queryParamsSlice"
import axios from "axios"
import { apiUrl } from "../../config"

export default function Sidebar() {
  const { secondName, dateFrom, dateTo } = useSelector((state) => state.queryParams)
  const dispatch = useDispatch()

  const changeSecondNameHandler = (e) => {
    dispatch(setSecondName(e.target.value))
  }

  const changeDateFromHandler = (e) => {
    dispatch(setDateFrom(e.target.value))
  }

  const changeDateToHandler = (e) => {
    dispatch(setDateTo(e.target.value))
  }

  const showResults = () => {
    dispatch(fetchTasks({ secondName, dateFrom, dateTo }))
  }

  const downloadXLSX = () => {
    const params = { secondName, dateFrom, dateTo }
    axios.get(`${apiUrl}/tasks/download`, { params })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${secondName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        // Обработка ошибки
        console.error('Ошибка при скачивании файла:', error);
      });
  }

  const enterPressHandle = (e) => {
    if (e.key === "Enter") {
      showResults()
    }
  }

  return (
    <div className="w-1/6 border-r flex flex-col gap-6 p-4 h-screen">
      <div>
        <MyInput
          required={true}
          type="text"
          value={secondName}
          onChange={changeSecondNameHandler}
          label="Фамилия"
          placeholder="Иванов"
          onKeyDown={enterPressHandle}
        />
      </div>
      <div className="flex gap-2">
        <MyInput onKeyDown={enterPressHandle} type="date" className="w-1/2" value={dateFrom} onChange={changeDateFromHandler} label="От" />
        <MyInput onKeyDown={enterPressHandle} type="date" className="w-1/2" value={dateTo} onChange={changeDateToHandler} label="До" />
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
