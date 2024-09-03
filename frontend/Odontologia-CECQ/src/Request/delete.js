import { token } from './fetch.js';
const apiUrl = import.meta.env.VITE_BASE_URL;

export function deleteData(url) {
  return (
        fetch(apiUrl+url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        })
  )
}
