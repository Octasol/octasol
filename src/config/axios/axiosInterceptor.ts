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
    
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // console.log(config.url);
    return config;
  },
  (error: any): Promise<any> => {
    // console.error(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // console.log(response.config);
    return response;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
