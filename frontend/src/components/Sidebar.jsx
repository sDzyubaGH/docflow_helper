import React from "react"
import MyInput from "./UI/MyInput"
import MyButton from "./UI/MyButton"

export default function Sidebar() {
  return (
    <div className="w-1/6 border-r flex flex-col gap-4 p-4">
      <div>
        <MyInput label="ФИО" placeholder="Иванов Иван Иванович" />
      </div>
      <div className="btns">
        <div>
          <MyButton onClick={() => console.log("click")}>Показать</MyButton>
        </div>
        <div>
          <MyButton>Выгрузка</MyButton>
        </div>
      </div>
    </div>
  )
}
