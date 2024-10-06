import { useFetch } from './fetch';

const apiUrl = '/auth/administrativos/me/'; 

export const useFetchUser = () => {
  const { data, loading, error } = useFetch(apiUrl);
  const nombre = data?.first_name || '';
  const apellido = data?.last_name || '';

  return { nombre, apellido, loading, error };
};
