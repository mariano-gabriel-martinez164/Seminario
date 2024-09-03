import { token } from './fetch.jsx';

export function putData(url, data) {

  return (
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,

        },
        body: JSON.stringify(data),
        })
  )
}
