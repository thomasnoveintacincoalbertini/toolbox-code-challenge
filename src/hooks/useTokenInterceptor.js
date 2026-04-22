import { useEffect } from 'react';
import axiosInstance from '../api/instance';

const useTokenInterceptor = (onExpired) => {
  useEffect(() => {
    const id = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && onExpired) {
          onExpired();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(id);
    };
  }, [onExpired]);
};

export default useTokenInterceptor;
