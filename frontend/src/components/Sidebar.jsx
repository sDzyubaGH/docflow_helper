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

export default function Sidebar() {
  const {secondName, dateFrom, dateTo} = useSelector((state) => state.queryParams)
  const [suitableUsers, setSuitableUsers] = useState([])
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
    dispatch(fetchTasks({secondName, dateFrom, dateTo}))
  }

  const downloadXLSX = async () => {
    const params = {secondName, dateFrom, dateTo}
    const response = await axios.get(`${apiUrl}/tasks/download`, {params, responseType: "blob"})
    const data = response.data

    const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
    saveAs(blob, `${secondName}_задачи.xlsx`)
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
        <div>
          {suitableUsers.length ? (
            <SuitableDocflowUsers setSuitableUsers={setSuitableUsers} suitableUsers={suitableUsers} />
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
