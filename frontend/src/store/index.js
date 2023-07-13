import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import queryParamsSlice from "./queryParamsSlice";
import filterParamsSlice from "./filterParamsSlice";
import appInfoSlice from "./appInfoSlice";
import documentsParamsSlice from "./documentsParamsSlice";
import documentsSlice from "./documentsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    queryParams: queryParamsSlice,
    filterParams: filterParamsSlice,
    appInfo: appInfoSlice,
    documentsParams: documentsParamsSlice,
    documents: documentsSlice
  }
})

export { store }