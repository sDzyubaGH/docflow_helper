import {createBrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store"
import TasksPage from "./pages/TasksPage"
import pages from "./utils/pages"
import RootLayout from "./pages/RootLayout"
import Documents from "./pages/DocumentsPage"
import NotFoundPage from "./pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <RootLayout />
      </Provider>
    ),
    children: [
      {
        index: true,
        path: pages.tasks,
        element: <TasksPage />,
      },
      {
        path: pages.documents,
        element: <Documents />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export default router
