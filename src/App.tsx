import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import SidebarContextProvider from './context/SidebarContext';
import { UserContextProvider } from './context/UserContext';
import { router } from './router/router';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SidebarContextProvider>
          <RouterProvider router={router} />
        </SidebarContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
