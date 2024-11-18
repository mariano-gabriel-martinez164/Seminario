const apiUrl = import.meta.env.VITE_BASE_URL;

import { useState } from 'react';

export function usePutData() {
  const [errorPut, setErrorPut] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async (url, data) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setErrorPut(null);

    try {
      const response = await fetch(apiUrl + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
      }

      return await response.json();

    } catch (error) {
      setErrorPut(error.message);
      console.error('Error en putData:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { putData, errorPut, loading };
}
