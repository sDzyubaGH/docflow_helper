import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import queryParamsSlice from "./queryParamsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    queryParams: queryParamsSlice
  }
})

export { store }