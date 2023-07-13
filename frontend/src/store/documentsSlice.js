import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config";
import axios from "axios";

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async function (params) {
    const response = await axios.get(`${apiUrl}/tasks`, { params })
    const data = response.data
    return data
  }
)

const initialState = {
  documents: [],
  loading: false,
  error: null,
  fetchResult: ''
}

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchDocuments.pending]: (state) => {
      state.loading = true
      state.error = null
      state.fetchResult = ''
    },
    [fetchDocuments.fulfilled]: (state, action) => {
      state.loading = false
      state.documents = action.payload
      if (action.payload?.length === 0) {
        state.fetchResult = 'empty'
      } else state.fetchResult = 'ok'
    },
    [fetchDocuments.rejected]: (state, action) => {
      console.log(action)
      state.loading = false
      state.error = action.error
      state.fetchResult = ''
    }
  }
})

export default documentsSlice.reducer