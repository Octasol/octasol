"use client";

import { decrement, increment } from "@/app/Redux/Features/loader/loaderSlice";
import { store } from "@/app/Redux/store";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const url = "/api/";
const counter = store.getState().counter.value;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // if(config.url?.includes("user") || config.url?.includes("radar")) {
    //   return config;
    // }
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
    // if(response.config.url?.includes("api/user") || response.config.url?.includes("radar")) {
    //   return response;
    // }
    store.dispatch(decrement());
    return response;
  },
  (error: any): Promise<any> => {
    store.dispatch(decrement());
    return Promise.reject(error);
  }
);

export default axiosInstance;
