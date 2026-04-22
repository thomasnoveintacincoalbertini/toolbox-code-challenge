import axios from 'axios';
import { BASE_URL } from './endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let onTokenExpired = null;

export const setTokenExpiredHandler = (handler) => {
  onTokenExpired = handler;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onTokenExpired) {
      onTokenExpired();
    }
    return Promise.reject(error);
  }
);

export const customInstance = ({ method, url, data, headers, ...rest }) =>
  axiosInstance({ method, url, data, headers, ...rest });

export default axiosInstance;
