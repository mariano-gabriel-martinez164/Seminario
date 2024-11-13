
const apiUrl = import.meta.env.VITE_BASE_URL;

export function deleteData(url) {
  const token = localStorage.getItem('token');
  return (
        console.log(token),
        fetch(apiUrl+url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        })
  )
}
