import { useFetch } from './fetch'; 

export const useFetchUser = (id) => {
  const { data: user, loading, error } = useFetch(`/auth/administrativos/${id}/`);

  return { user, loading, error };
};

