import { useFetch } from './fetch';

const apiUrl = '/auth/administrativos/me/'; 

export const useFetchUser = () => {
  const { data, loading, error } = useFetch(apiUrl);
  const nombre = data?.first_name || '';
  const apellido = data?.last_name || '';
  const admin = data?.is_staff || '';
  console.log(data);
  return { nombre, apellido, admin, loading, error };
};
