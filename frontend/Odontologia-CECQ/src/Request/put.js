
const apiUrl = import.meta.env.VITE_BASE_URL;

export function putData(url, data) {
  const token = localStorage.getItem('token');
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
    
export async function putDataWithResponse(url, data) {
  const token = localStorage.getItem('token');
  const response = await fetch(apiUrl+url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}