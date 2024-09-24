"use client";

import { decrement, increment } from "@/app/Redux/Features/loader/loaderSlice";
import { store } from "@/app/Redux/store";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const url = "/api/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    store.dispatch(increment());
    return config;
  },
  (error: any): Promise<any> => {
    store.dispatch(decrement());
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    store.dispatch(decrement());
    return response;
  },
  (error: any): Promise<any> => {
    store.dispatch(decrement());
    return Promise.reject(error);
  }
);

export default axiosInstance;
