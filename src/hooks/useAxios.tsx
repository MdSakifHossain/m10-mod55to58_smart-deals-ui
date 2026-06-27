import axios from "axios"
const API = import.meta.env.VITE_API_URL

const putlicApi = axios.create({
  baseURL: API,
  timeout: 10000, // 10 seconds max
  headers: {
    "Content-Type": "application/json",
  },
})

const useAxios = () => {
  return { putlicApi }
}

export default useAxios
