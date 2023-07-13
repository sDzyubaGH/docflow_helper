import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import {Provider} from "react-redux"
import {store} from "./store/index.js"
import {RouterProvider} from "react-router-dom"
import {createBrowserRouter} from "react-router-dom"
import router from "./router"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
