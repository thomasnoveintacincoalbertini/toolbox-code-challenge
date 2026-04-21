import { customInstance } from './instance';
import { DATA_ENDPOINT } from './endpoints';

export const getCarousels = (token, type) =>
  customInstance({
    method: 'GET',
    url: DATA_ENDPOINT,
    headers: { Authorization: `${type} ${token}` },
  }).then((res) => res.data);
