import axios from "axios";

// "http://localhost:3030/api"
//
const baseURL = "https://digital-sonod-server.vercel.app/api";
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
