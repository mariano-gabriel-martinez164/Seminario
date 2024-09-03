import { token } from './fetch.jsx';

export function deleteData(url) {
  return (
        fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        })
  )
}
