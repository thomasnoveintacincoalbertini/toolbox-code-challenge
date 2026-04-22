import { useEffect } from 'react';
import axiosInstance from '../api/instance';

/**
 * Separado de useAuth para que el manejo de red y el estado de sesión
 * sean responsabilidades distintas.
 * @see {@link ../api/instance.js}
 * @see {@link ./useAuth.js}
 */
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
       // El eject en el cleanup evita interceptores duplicados si el hook se monta más de una vez.
      axiosInstance.interceptors.response.eject(id);
    };
  }, [onExpired]);
};

export default useTokenInterceptor;
