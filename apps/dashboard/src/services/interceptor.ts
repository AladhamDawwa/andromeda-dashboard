import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://andromeda-8436b8b113fa.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Accept-Language": "en",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const latestToken = Cookies.get("user_token");
    if (latestToken) {
      config.headers.Authorization = `Bearer ${latestToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
