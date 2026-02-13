import axios from "axios";

export const API_BASE = "http://localhost:8080";

export function getToken() {
  return localStorage.getItem("token");
}

export const api = axios.create({
  baseURL: API_BASE,
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});
