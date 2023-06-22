import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  FIO: '',
  dateFrom: '',
  dateTo: ''
}

const changeFIO = createAction('changeFIO')

export default createSlice({
  name: 'searchParams',
  initialState,
  reducers: {

  }
})