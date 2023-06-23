import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  secondName: '',
  dateFrom: '',
  dateTo: '',
  limit: 100,
  page: 1
}

const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setSecondName(state, action) {
      state.secondName = action.payload
    },
    setDateFrom(state, action) {
      state.dateFrom = action.payload
    },
    setDateTo(state, action) {
      state.dateTo = action.payload
    }
  }
})

export const { setSecondName, setDateFrom, setDateTo } = queryParamsSlice.actions

export default queryParamsSlice.reducer