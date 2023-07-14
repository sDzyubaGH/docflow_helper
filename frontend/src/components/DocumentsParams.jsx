import React, {useEffect, useState} from "react"
import MyInput from "./UI/MyInput"
import {useDispatch, useSelector} from "react-redux"
import {setSender, setDateFrom, setDateTo, fetchCategories} from "../store/documentsParamsSlice"
import arrow from "../assets/angle-arrow-down_icon-icons.com_73683.png"
import MyButton from "./UI/MyButton"
import {apiUrl} from "../../config"
import axios from "axios"

export default function DocumentsParams() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [suitableObjects, setSuitableObjects] = useState([])

  const options = useSelector((state) => state.documentsParams)
  const {sender, dateFrom, dateTo, categories, loading} = options
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const changeSenderHandler = async (e) => {
    const query = e.target.value
    dispatch(setSender(query))

    if (!query) return setSuitableObjects([])

    try {
      const response = await axios.get(`${apiUrl}/documents/docflowObjects`, {params: {q: query}})
      const data = response.data
      setSuitableObjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  const showResults = () => {}

  const enterPressHandle = (e) => {
    if (e.key === "Enter") {
      showResults()
    }
  }

  const categoryClickHandler = (c) => {
    for (const cat of selectedCategories) {
      if (c.id === cat.id) return
    }

    setSelectedCategories([...selectedCategories, c])
  }

  const selectedCategoryClickHandler = () => {
    setShowCategories(!showCategories)
  }

  const changeDateFromHandler = (e) => {
    dispatch(setDateFrom(e.target.value))
  }

  const changeDateToHandler = (e) => {
    dispatch(setDateTo(e.target.value))
  }

  const downloadXLSX = () => {}

  let filteredCategories = categories?.filter((c) => {
    for (const sc of selectedCategories) {
      if (sc?.id === c?.id) return false
    }
    return true
  })

  const removeCategoryClickHandler = (c, e) => {
    e.stopPropagation()
    if (selectedCategories.includes(c)) {
      setSelectedCategories(selectedCategories.filter((sc) => sc.id !== c.id))
    }
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <MyInput
          label="Отправитель"
          required={true}
          onKeyDown={enterPressHandle}
          placeholder="Название организации"
          onChange={changeSenderHandler}
          value={sender}
        />
      </div>
      <div className="max-w-[300px]">
        <label className="block mb-2 text-sm font-medium text-gray-900">Категории</label>
        <div
          onClick={selectedCategoryClickHandler}
          className="flex outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
        >
          <div className="flex-1">
            {selectedCategories.length
              ? selectedCategories.map((sc) => (
                  <div key={sc.id} className="flex justify-between border-b py-1 first:pt-0 last:border-none last:pb-0">
                    <span>{sc.name}</span>
                    <span
                      className="cursor-pointer flex justify-center items-center"
                      onClick={(e) => removeCategoryClickHandler(sc, e)}
                    >
                      x
                    </span>
                  </div>
                ))
              : "Все документы"}
          </div>
          <div className="pl-5 flex justify-center items-end">
            <img src={arrow} className={`w-2 transition ${showCategories ? "rotate-180" : ""}`} alt="" />
          </div>
        </div>
        {showCategories ? (
          <ul className="mt-2 max-h-[300px] overflow-auto cursor-pointer border rounded">
            {/* <li className="hover:bg-blue-500 hover:text-white rounded p-1 last-of-type:border-none border-b"></li> */}
            {filteredCategories?.map((c) => (
              <li
                onClick={() => categoryClickHandler(c)}
                className="hover:bg-blue-500 hover:text-white rounded p-1 last-of-type:border-none border-b"
                key={c.id}
              >
                {c.name}
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
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
      <div className="btns flex justify-between flex-wrap">
        <div>
          <MyButton onClick={showResults}>Показать</MyButton>
        </div>
        <div>
          <MyButton disabled={loading ? true : false} onClick={downloadXLSX}>
            {loading ? "Загрузка..." : "Скачать .xlsx"}
          </MyButton>
        </div>
      </div>
    </div>
  )
}
