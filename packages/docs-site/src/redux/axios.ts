import axios from "axios";

export const getApiUrl = () => "https://luck.up.railway.app/";

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Max-Age": 600,
  },
  withCredentials: true,
});

export default axiosInstance;
