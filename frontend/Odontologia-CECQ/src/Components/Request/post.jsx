import { token } from './fetch.jsx';

export function postData(url, data) {
  if (url) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,

        },
        body: JSON.stringify(data),
    });
  }
}
