import { customInstance } from './instance';
import { DATA_ENDPOINT } from './endpoints';

/**
 * El header de autorización se pasa por llamada y no se inyecta desde un
 * interceptor de request porque instance.js no tiene acceso al store de Redux,
 * y darle ese acceso acoplaría la capa HTTP a la capa de estado.
 *
 * A esta escala (un único endpoint autenticado) he decidio que la solución es explícita
 * y testeable: getCarousels recibe el token como parámetro y no depende
 * de ningún estado global.
 * Se podría evitar repetir el header en cada llamada sin acoplar instance.js al store.
 * @see {@link ./instance.js}
 * @see {@link ../store/authSlice.js}
 */
export const getCarousels = (token, type) =>
  customInstance({
    method: 'GET',
    url: DATA_ENDPOINT,
    headers: { Authorization: `${type} ${token}` },
  }).then((res) => res.data);
