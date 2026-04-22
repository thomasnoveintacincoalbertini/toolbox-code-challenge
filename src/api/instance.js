import axios from 'axios';
import { BASE_URL } from './endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const customInstance = ({ method, url, data, headers, ...rest }) =>
  axiosInstance({ method, url, data, headers, ...rest });

export default axiosInstance;
