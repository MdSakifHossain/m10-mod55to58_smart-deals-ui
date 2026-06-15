import { createBrowserRouter } from "react-router"

import App from "./layouts/App"
import Unusual from "./layouts/Unusual"
import PrivatePage from "./layouts/PrivatePage"

import Homepage from "./pages/Homepage"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AllProducts from "./pages/AllProducts"
import MyProducts from "./pages/MyProducts"
import MyBids from "./pages/MyBids"
import CreateProduct from "./pages/CreateProduct"
import ProductDetails from "./pages/ProductDetails"
import Profile from "./pages/Profile"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "my-products",
        element: (
          <PrivatePage>
            <MyProducts />
          </PrivatePage>
        ),
      },
      {
        path: "my-bids",
        Component: MyBids,
      },
      {
        path: "create-product",
        element: (
          <PrivatePage>
            <CreateProduct />
          </PrivatePage>
        ),
      },
      {
        path: "product-details/:product_id",
        element: (
          <PrivatePage>
            <ProductDetails />
          </PrivatePage>
        ),
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
      {
        path: "profile",
        element: (
          <PrivatePage>
            <Profile />
          </PrivatePage>
        ),
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
