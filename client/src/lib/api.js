import axios from "axios";

// Use Vercel env var in production, fallback to localhost for dev
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export function getToken() {
  //  backward compatibility (some pages used token, some used jwtToken)
  return localStorage.getItem("jwtToken") || localStorage.getItem("token");
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
