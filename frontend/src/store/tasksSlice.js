import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async function () {
    const response = await fetch("http://localhost:8080/api/tasks")
    if (!response.ok) {
      throw new Error('Unable to fetch tasks')
    }
    const data = await response.json()
    return data
  }
)

const initialState = {
  tasks: [],
  loading: false,
  error: null
}

const changeFIO = createAction('changeFIO')

const tasksSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.loading = false
      state.tasks = action.payload
    },
    [fetchTasks.rejected]: (state, action) => {
      state.loading = false
      // state.error = 
    }
  }
})

export default tasksSlice.reducer