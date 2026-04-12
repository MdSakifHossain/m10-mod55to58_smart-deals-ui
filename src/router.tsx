import { createBrowserRouter } from "react-router"

import App from "./layouts/App"
import Unusual from "./layouts/Unusual"

import Homepage from "./pages/Homepage"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Homepage,
      },
    ],
  },
  {
    path: "/",
    Component: Unusual,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: Unusual,
    children: [
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])
