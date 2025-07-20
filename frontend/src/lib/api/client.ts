import axios, { AxiosInstance } from "axios";

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  timeout: 10000,
};

// Create axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Add request interceptor to set Content-Type only for requests with data
apiClient.interceptors.request.use((config) => {
  // Only set Content-Type for requests that typically have a body
  if (
    config.method &&
    ["post", "put", "patch"].includes(config.method.toLowerCase()) &&
    config.data
  ) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default apiClient;
