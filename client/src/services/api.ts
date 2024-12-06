import axios from "axios";
import Cookies from "js-cookie";

// Set up axios with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: Attach authorization token if present in cookies
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Get the token from cookies
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
