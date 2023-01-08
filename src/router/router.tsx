import { createBrowserRouter } from 'react-router-dom';
import Homepage from './routes/Homepage';
import Login from './routes/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);
