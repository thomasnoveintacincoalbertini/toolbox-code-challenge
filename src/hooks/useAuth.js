import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../api/authService';
import { setAuth } from '../store/authSlice';
import { selectToken, selectTokenType } from '../store/authSelectors';
import { isTokenExpired } from '../utils/tokenUtils';

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const type = useSelector(selectTokenType);

  const authenticate = useCallback(async () => {
    try {
      const data = await login();
      dispatch(setAuth({ token: data.token, type: data.type }));
    } catch (error) {
      console.error('Auth error:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      authenticate();
    }
  }, []);

  return { token, type, authenticate };
};

export default useAuth;
