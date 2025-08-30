import axios from "axios";

//"https://digital-sonod-server.vercel.app/api"
const baseURL = "http://localhost:3030/api";
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
