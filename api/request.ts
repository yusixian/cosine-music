import { STORAGE_KEY } from '@/constants';
import axios from 'axios';
import { AxiosRequestHeaders } from 'axios';
import localforage from 'localforage';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PREFIX,
  timeout: 30000,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = (await localforage.getItem(STORAGE_KEY.USER_TOKEN)) ?? '';
    const newHeaders = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
    if (token) config.headers = newHeaders;

    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default instance;
