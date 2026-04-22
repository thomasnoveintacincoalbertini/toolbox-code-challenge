import { useQuery } from '@tanstack/react-query';
import { getCarousels } from '../api/dataService';
import { isTokenExpired } from '../utils/tokenUtils';

const useCarousels = (token, type) =>
  useQuery({
    queryKey: ['carousels', token, type],
    queryFn: () => getCarousels(token, type),
    enabled: !!token && !!type && !isTokenExpired(token), // si el token ya expiró, evitamos un 401 innecesario.
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

export default useCarousels;
