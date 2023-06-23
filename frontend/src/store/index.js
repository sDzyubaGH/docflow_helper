import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import queryParamsSlice from "./queryParamsSlice";
import filterParamsSlice from "./filterParamsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    queryParams: queryParamsSlice,
    filterParams: filterParamsSlice
  }
})

export { store }