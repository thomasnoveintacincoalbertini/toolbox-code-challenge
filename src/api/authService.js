import { customInstance } from './instance';
import { AUTH_ENDPOINT, AUTH_SUB } from './endpoints';

export const login = () =>
  customInstance({
    method: 'POST',
    url: AUTH_ENDPOINT,
    data: { sub: AUTH_SUB },
  }).then((res) => res.data);
