// @ts-nocheck
import { useAuth } from "@/contexts/AuthProvider"
import axios from "axios"
import { useEffect } from "react"
const API = import.meta.env.VITE_API_URL

const putlicApi = axios.create({
  baseURL: API,
  timeout: 10000, // 10 seconds max
  headers: {
    "Content-Type": "application/json",
  },
})

const privateApi = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

const useAxios = () => {
  const { user } = useAuth()
  const token = user?.firebaseUser?.accessToken

  useEffect(() => {
    const requestInterceptor = privateApi.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`
      return config
    })

    const responseInterceptro = privateApi.interceptors.response.use(
      (res) => res,
      (err) => {
        // if err.status is 401 or 403 then log out the user and navigate to the login page
        console.log(`error inside the interceptor`, err)
      }
    )

    return () => {
      privateApi.interceptors.request.eject(requestInterceptor)
      privateApi.interceptors.request.eject(responseInterceptro)
    }
  }, [token])

  return { putlicApi, privateApi }
}

export default useAxios
