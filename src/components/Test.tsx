import { useQuery } from '@tanstack/react-query';

function Test() {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default Test;
