import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import ItemInfoContextProvider from './context/ItemInfoContext';
import { UserContextProvider } from './context/UserContext';
import { router } from './router/router';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ItemInfoContextProvider>
          <RouterProvider router={router} />
        </ItemInfoContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
