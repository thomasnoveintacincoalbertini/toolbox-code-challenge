import { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../api/authService';
import { setAuth } from '../store/authSlice';
import { selectToken, selectTokenType } from '../store/authSelectors';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';

const TOKEN_REFRESH_SKEW_MS = 1000;

const useAuth = () => {
  // dispatch es estable en react-redux, por lo que authenticate nunca cambia de referencia
  // y es seguro pasarla como dependencia a otros hooks sin generar re-renders
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const type = useSelector(selectTokenType);
  const requestRef = useRef(null);
  const [authError, setAuthError] = useState(null);

  const authenticate = useCallback(async () => {
    if (requestRef.current) {
      return requestRef.current;
    }

    setAuthError(null);

    const request = login()
      .then((data) => {
        dispatch(setAuth({ token: data.token, type: data.type }));
        return data;
      })
      .catch((error) => {
        setAuthError('No se pudo iniciar sesion. Intente nuevamente.');
        console.error('Auth error:', error);
        throw error;
      })
      .finally(() => {
        requestRef.current = null;
      });

    requestRef.current = request;

    return request;
  }, [dispatch]);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      authenticate().catch(() => {});
      return undefined;
    }

    const decoded = decodeToken(token);
    const expireAt = decoded?.expireDate ? new Date(decoded.expireDate).getTime() : null;

    if (!expireAt) {
      return undefined;
    }

    const refreshInMs = Math.max(expireAt - Date.now() - TOKEN_REFRESH_SKEW_MS, 0);
    const timeoutId = setTimeout(() => {
      authenticate().catch(() => {});
    }, refreshInMs);

    return () => clearTimeout(timeoutId);
    // token: re-corre el efecto cuando llega un token nuevo para reprogramar el timer.
    // authenticate: estable por useCallback, evita closures desactualizados.
  }, [token, authenticate]);

  return { token, type, authenticate, authError };
};

export default useAuth;
