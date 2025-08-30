import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://digital-sonod-server.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
