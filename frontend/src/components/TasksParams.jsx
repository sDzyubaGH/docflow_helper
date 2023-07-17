import React, {useState} from "react"
import MyInput from "./UI/MyInput"
import MyButton from "./UI/MyButton"
import {useDispatch, useSelector} from "react-redux"
import {fetchTasks} from "../store/tasksSlice"
import {setSecondName, setDateFrom, setDateTo} from "../store/queryParamsSlice"
import axios from "axios"
import {apiUrl} from "../../config"
import SuitableDocflowUsers from "./SuitableDocflowUsers"
import {saveAs} from "file-saver"

export default function TasksParams() {
  const {secondName, dateFrom, dateTo} = useSelector((state) => state.queryParams)
  const [suitableUsers, setSuitableUsers] = useState([])
  const [excelIsLoading, setExcelIsLoading] = useState(false)
  const dispatch = useDispatch()

  const changeSecondNameHandler = async (e) => {
    const query = e.target.value
    dispatch(setSecondName(query))

    if (!query) return setSuitableUsers([])

    try {
      const response = await axios.get(`${apiUrl}/tasks/docflowUsers`, {params: {q: query}})
      const data = response.data
      setSuitableUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const changeDateFromHandler = (e) => {
    dispatch(setDateFrom(e.target.value))
  }

  const changeDateToHandler = (e) => {
    dispatch(setDateTo(e.target.value))
  }

  const showResults = () => {
    if (!secondName) return null
    
    dispatch(fetchTasks({secondName, dateFrom, dateTo}))
  }

  const downloadXLSX = async () => {
    if (!secondName) return
    setExcelIsLoading(true)
    const params = {secondName, dateFrom, dateTo}
    const response = await axios.get(`${apiUrl}/tasks/download`, {params, responseType: "blob"})
    const data = response.data

    const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
    saveAs(blob, `${secondName}_задачи.xlsx`)
    setExcelIsLoading(false)
  }

  const enterPressHandle = (e) => {
    if (e.key === "Enter") {
      showResults()
    }
  }

  const selectUser = (user) => {
    dispatch(setSecondName(user.name))
    setSuitableUsers([])
  }

  return (
    <div className="flex flex-col gap-6 p-4">
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
        <div>
          {suitableUsers.length ? (
            <SuitableDocflowUsers selectEvent={selectUser} setSuitableUsers={setSuitableUsers} suitableUsers={suitableUsers} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <MyInput
          onKeyDown={enterPressHandle}
          type="date"
          className="w-1/2"
          value={dateFrom}
          onChange={changeDateFromHandler}
          label="От"
        />
        <MyInput
          onKeyDown={enterPressHandle}
          type="date"
          className="w-1/2"
          value={dateTo}
          onChange={changeDateToHandler}
          label="До"
        />
      </div>
      <div className="btns flex justify-between gap-4">
        <MyButton className="w-full" onClick={showResults}>
          Показать
        </MyButton>
        <MyButton className="w-full" disabled={excelIsLoading ? true : false} onClick={downloadXLSX}>
          {excelIsLoading ? "Загрузка..." : "Скачать .xlsx"}
        </MyButton>
      </div>
    </div>
  )
}
