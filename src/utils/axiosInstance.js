import axios from "axios";

const baseURL = "http://localhost:3030/api"; //"https://digital-sonod-server.vercel.app/api"
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
