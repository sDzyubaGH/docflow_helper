import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksType: 'all'
}

const filterParamsSlice = createSlice({
  name: 'filterParams',
  initialState,
  reducers: {
    setTasksType(state, action) {
      state.tasksType = action.payload
    }
  }
})

export const { setTasksType } = filterParamsSlice.actions

export default filterParamsSlice.reducer