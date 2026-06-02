import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API,
  timeout: 10000,  // 10 seconds max.
  headers: {
    "Content-Type": "application/json",
  },
});
