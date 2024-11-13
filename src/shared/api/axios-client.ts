import axios from 'axios';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { paths } from '../paths';

export const axiosClient = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://log.click-soft.co.kr/api"
    : "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 설정
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      window.location.href = paths.login;
    }
    return Promise.reject(error);
  }
);