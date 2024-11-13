import axios from 'axios';
import { STORAGE_KEYS } from '../constants/storage-keys';

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