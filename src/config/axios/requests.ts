import axiosInstance from "./axiosInterceptor";

export const GET = async (
  url: string,
  additionalHeaders?: Record<string, string>
) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        ...additionalHeaders,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const POST = async (
  url: string,
  data: any,
  additionalHeaders?: Record<string, string>
) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        ...additionalHeaders,
      },
    });
    return { response: response, error: null };
  } catch (error) {
    return { response: null, error: error };
  }
};

export const PUT = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DELETE = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
