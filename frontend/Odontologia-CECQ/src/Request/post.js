import { token } from './fetch.js';
const apiUrl = import.meta.env.VITE_BASE_URL;

export function postData(url, data) {
  if (url) {
    console.log('post url:', url);
    console.log('post data:', data);
    fetch(apiUrl+url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,

        },
        body: JSON.stringify(data),
    });
  }
}

export async function postDataWithResponse(url, data) {
  if (url) {
    console.log('post url:', url);
    console.log('post data:', data);
    const response = await fetch(apiUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}