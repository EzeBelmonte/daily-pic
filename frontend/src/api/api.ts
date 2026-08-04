import axios from "axios";

import {
  getToken,
  setToken,
} from "@/utils/getToken";

import { triggerLogout } from "@/app/services/auth.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ========================================
// REFRESH COMPARTIDO
// ========================================

let refreshPromise: Promise<string> | null = null;

// ========================================
// REQUEST
// ========================================

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================================
// RESPONSE
// ========================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Evitamos que una misma request
    // entre en un loop infinito
    if (originalRequest._retry) {

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ========================================
    // SI YA HAY UN REFRESH EN CURSO
    // ========================================

    if (!refreshPromise) {

      refreshPromise = refreshApi
        .post("/auth/refresh")
        .then((response) => {

          const newToken =
            response.data.accessToken;

          setToken(newToken);

          return newToken;
        })
        .finally(() => {
          refreshPromise = null;
        });
      
    }
    
    try {
      // Si el refresh ya estaba ocurriendo,
      // esperamos el mismo refresh.
      const newToken = await refreshPromise;

      originalRequest.headers.Authorization =
        `Bearer ${newToken}`;

      return api(originalRequest);

    } catch (refreshError) {

      triggerLogout();

      return Promise.reject(refreshError);
    }
  }
);

export default api;