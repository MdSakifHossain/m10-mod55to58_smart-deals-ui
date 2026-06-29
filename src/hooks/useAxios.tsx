// @ts-nocheck
import { useAuth } from "@/contexts/AuthProvider"
import axios from "axios"
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

  privateApi.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`
    return config
  })

  return { putlicApi, privateApi }
}

export default useAxios
