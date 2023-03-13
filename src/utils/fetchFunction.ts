export async function fetchFn(fetchInput: {
  url: string;
  body?: object;
  method?: 'POST' | 'DELETE' | 'GET' | 'PUT';
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${fetchInput.url}`, {
    method: fetchInput.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(fetchInput.body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
