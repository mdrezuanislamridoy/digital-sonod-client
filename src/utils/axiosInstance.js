import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "digital-sonod-server-l6m5386sn.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
