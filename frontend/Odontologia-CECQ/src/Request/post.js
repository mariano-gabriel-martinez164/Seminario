
const apiUrl = import.meta.env.VITE_BASE_URL;

export function postData(url, data) {
  const token = localStorage.getItem('token');
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
