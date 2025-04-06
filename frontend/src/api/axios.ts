import axios from "axios";
import { BASE_URL } from "../utils/urlConfig";
import { useUserStore } from "../store/store";

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
      useUserStore.getState().clearUser();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
