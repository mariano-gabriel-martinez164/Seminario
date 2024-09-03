import { token } from './fetch.js';
const apiUrl = import.meta.env.VITE_BASE_URL;

export function putData(url, data) {

  return (
    fetch(apiUrl+url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,

        },
        body: JSON.stringify(data),
        })
  )
}
