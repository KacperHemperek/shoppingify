export function fetchFn(fetchInput: {
  url: string;
  body?: object;
  method?: 'POST' | 'DELETE' | 'GET' | 'PUT';
}) {
  return fetch(`${import.meta.env.VITE_API_URL}${fetchInput.url}`, {
    method: fetchInput.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(fetchInput.body),
  }).then((res) => res.json());
}
