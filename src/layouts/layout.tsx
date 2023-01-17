import { useState } from 'react';
import {
  Navigate,
  Outlet,
  useHref,
  useLocation,
  useMatches,
  useNavigate,
} from 'react-router-dom';
import {
  ShoppingCartIcon,
  ArrowPathIcon,
  ListBulletIcon,
  ChartBarSquareIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import NavOption from '../components/NavOption';
import { useUser } from '../hooks/useUser';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import NotLoggedIn from '../router/routes/NotLoggedIn';
import Loadingpage from '../router/routes/Loadingpage';
import Login from '../router/routes/Login';

function RouteGuard() {
  const location = useLocation();
  const { user, loading } = useUser();

  // input all your restricted routes
  const restrictedRoutes: string[] = ['/', '/history', '/statistics'];

  if (loading) {
    return <Loadingpage />;
  }

  if (restrictedRoutes.includes(location.pathname) && !user) {
    return <NotLoggedIn />;
  }

  return <Outlet />;
}

function Layout() {
  const navigate = useNavigate();
  const { user } = useUser();

  const logout = () => {
    signOut(auth);
    navigate('/login');
  };

  return (
    <div className='flex h-screen w-screen'>
      <nav className='flex flex-col justify-between'>
        <div className='p-3 md:p-6'></div>
        <div className='flex flex-col space-y-6 md:space-y-12'>
          <NavOption
            to={'/'}
            icon={<ListBulletIcon className='h-6 w-6 text-neutral-dark' />}
          />
          <NavOption
            to={'history'}
            icon={<ArrowPathIcon className='h-6 w-6 text-neutral-dark' />}
          />
          <NavOption
            to={'statistics'}
            icon={<ChartBarSquareIcon className='h-6 w-6 text-neutral-dark' />}
          />
          {user ? (
            <button onClick={logout} className='flex h-14 items-center'>
              <div className='h-full w-2' />
              <div className='flex h-full w-full items-center justify-center'>
                <ArrowLeftOnRectangleIcon className='h-6 w-6 text-neutral-dark' />
              </div>
            </button>
          ) : (
            <NavOption
              to={'login'}
              icon={
                <ArrowRightOnRectangleIcon className='h-6 w-6 text-neutral-dark' />
              }
            />
          )}
        </div>
        <div className='flex flex-col p-3 md:p-6'>
          <button className='rounded-full bg-primary p-3'>
            <ShoppingCartIcon className='h-6 w-6 text-white' />
          </button>
        </div>
      </nav>
      <main className='h-full w-full overflow-y-scroll  bg-neutral-extralight'>
        <RouteGuard />
      </main>
    </div>
  );
}

export default Layout;
