import axios, { AxiosInstance } from "axios";

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG);

export default apiClient;
