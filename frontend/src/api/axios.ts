import axios from "axios";
import { BASE_URL } from "../utils/urlConfig";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: BASE_URL(),
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "An error occurred. Please try again."
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;
