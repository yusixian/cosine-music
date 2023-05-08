import { STORAGE_KEY } from '@/constants';
import axios, { AxiosRequestConfig } from 'axios';
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

/**
 * post formData 请求 上传图片不需要token
 * @param {string} url - 请求短url
 * @param {FormData} data 请求数据
 * @returns {Promise<T>} 返回 T 类型数据
 */
export const postFormData = <T>(url: string, data: FormData, config?: AxiosRequestConfig<FormData>): Promise<T> =>
  instance.postForm(url, data, config);

export default instance;
