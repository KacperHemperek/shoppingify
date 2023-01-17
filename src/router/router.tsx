import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../layouts/layout';
import Homepage from './routes/Homepage';
import Login from './routes/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Homepage />} />
      <Route path='login' element={<Login />} />
      <Route path='history' element={<div>History</div>} />
      <Route path='statistics' element={<div>Statistics</div>} />
    </Route>
  )
);
