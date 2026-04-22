import axios from 'axios';
import { BASE_URL } from './endpoints';

/**
 * Los interceptores se registran desde afuera (useTokenInterceptor)
 * para que esta instancia sea testeable sin depender de lógica de auth.
 * @see {@link ../hooks/useTokenInterceptor.js}
 */
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
