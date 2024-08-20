import { useState, useEffect } from 'react';


export function useFetch(url) {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setData(data);
          } else if (data.results) {
            setData(data.results);
          } else {
            console.error('Formato de datos inesperado:', data);
          }
        })
        .catch((error) => console.log(error));
    }, []);
  
    return data;
  }
  

