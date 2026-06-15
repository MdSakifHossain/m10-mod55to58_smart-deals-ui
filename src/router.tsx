// @ts-nocheck
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
import { api } from "./lib/api"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    hydrateFallbackElement: <></>,
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
        loader: async ({ params }) => {
          const { product_id } = params

          let product = null
          let seller_info = null
          let error = null

          // try to get product info else send error
          try {
            const response = await api.get(`/products/${product_id}`)
            product = response.data
          } catch (err) {
            console.error(err.response?.data?.message)
            product = null
            seller_info = null
            error = {
              status: err.response?.status,
              message: "Failed to fetch product details",
            }
            return {
              product,
              seller_info,
              error,
            }
          }

          // try to get seller info else send error
          try {
            const response = await api.get(`/users/${product.seller_id}`)
            seller_info = response.data
          } catch (err) {
            console.error(err.response?.data?.message)
            product = null
            seller_info = null
            error = {
              status: err.response?.status,
              message: "Failed to fetch seller details",
            }

            return {
              product,
              seller_info,
              error,
            }
          }

          // everything is fine, we get full information without error
          return {
            product,
            seller_info,
            error,
          }
        },
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
