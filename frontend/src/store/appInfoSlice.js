// sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import pages from '../utils/pages';

const initialState = {
  currentPage: pages.tasks,
};

const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    selectPage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
});

export const { selectPage } = appInfoSlice.actions;

export default appInfoSlice.reducer;
