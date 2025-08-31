import axios from "axios";

const baseURL = "https://digital-sonod-server.vercel.app/api"; //"http://localhost:3030/api"
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
