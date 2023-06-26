import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async function (params) {
    const response = await axios.get(`${apiUrl}/tasks`, { params })
    const data = response.data
    return data
  }
)

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  fetchResult: ''
}

const tasksSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.loading = true
      state.error = null
      state.fetchResult = ''
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.loading = false
      state.tasks = action.payload
      if (action.payload?.length === 0) {
        state.fetchResult = 'empty'
      } else state.fetchResult = 'ok'
    },
    [fetchTasks.rejected]: (state, action) => {
      console.log(action)
      state.loading = false
      state.error = action.error
      state.fetchResult = ''
    }
  }
})

export default tasksSlice.reducer