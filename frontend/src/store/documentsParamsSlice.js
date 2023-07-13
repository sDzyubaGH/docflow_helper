import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../config";

export const fetchCategories = createAsyncThunk(
  'documentsParams/fetchCategories',
  async () => {
    const response = await axios.get(`${apiUrl}/documents/categories`)
    const data = response.data
    return data
  }
)

const initialState = {
  sender: '',
  dateFrom: '',
  dateTo: '',
  category: '',
  limit: 100,
  page: 1,
  loading: false,
  error: null
}

const documentsParamsSlice = createSlice({
  name: 'documentsParams',
  initialState,
  reducers: {
    setSender(state, action) {
      state.sender = action.payload
    },
    setDateFrom(state, action) {
      state.dateFrom = action.payload
    },
    setDateTo(state, action) {
      state.dateTo = action.payload
    }
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.error = null
      state.loading = true
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.error = null
      state.loading = false
    },
    [fetchCategories.rejected]: (state, action) => {
      state.error = action.error
      state.loading = false
    }
  }
})

export const { setSender, setDateFrom, setDateTo } = documentsParamsSlice.actions

export default documentsParamsSlice.reducer