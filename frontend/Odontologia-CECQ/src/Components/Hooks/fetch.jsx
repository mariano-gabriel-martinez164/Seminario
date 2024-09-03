import { useState, useEffect } from 'react';


export function useFetchArray(url) {
    const [datoArray, setDatoArray] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDatoArray(data);
          } else if (Array.isArray(data.results)) {
            setDatoArray(data.results);
          }
        })
        .catch((error) => console.log(error));
    }, [url]);
  
    return datoArray
  }

  export function useFetch(url) {
    const [dato, setDato] = useState({});
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setDato(data);
        })
        .catch((error) => console.log(error));
    }, [url]);
  
    return dato
  }

  

