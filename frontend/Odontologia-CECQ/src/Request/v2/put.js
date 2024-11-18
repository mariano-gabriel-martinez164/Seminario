import { token } from '../fetch';
const apiUrl = import.meta.env.VITE_BASE_URL;

export async function putData(url, data){
  if(url) {
    console.log('put url:', apiUrl + url);
    console.log('put data:', data);
    try {
      const response = await fetch(apiUrl + url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const errorMessage = `Error : ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('error en la solicitud:', error);
    }
  }
}
