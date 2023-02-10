import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import Logo from '../assets/logo.svg';
import React, { createContext, useContext, useState } from 'react';
import DesktopSideBar from '../components/SideBar';

function RouteGuard() {
  const location = useLocation();
  const { user, loading } = useUser();

  // input all your restricted routes
  const restrictedRoutes: string[] = ['/', '/history', '/statistics'];
  // input all routes that are not avalible to logged in user
  const redirectFromRoutesWhenUserLoggedIn: string[] = ['/login'];

  if (loading) {
    return <Loadingpage />;
  }

  if (restrictedRoutes.includes(location.pathname) && !user) {
    return <NotLoggedIn />;
  }

  if (redirectFromRoutesWhenUserLoggedIn.includes(location.pathname) && user) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
}

const SidebarContext = createContext<
  [
    showAddItem: boolean,
    setShowAddItem: React.Dispatch<React.SetStateAction<boolean>>
  ]
>([false, () => {}]);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

function Layout() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className='flex h-screen w-screen bg-neutral-extralight'>
      <nav className='flex flex-col justify-between bg-white'>
        <div className='flex items-center justify-center p-3 lg:p-6'>
          <img src={Logo} alt='Website Logo' />
        </div>
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
        <div className='flex flex-col p-3 lg:p-6'>
          <button
            className='rounded-full bg-primary p-3'
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <ShoppingCartIcon className='h-6 w-6 text-white' />
          </button>
        </div>
      </nav>
      <main className='scrollbar flex h-screen w-full overflow-y-auto bg-neutral-extralight'>
        <RouteGuard />
      </main>
      <SidebarContext.Provider value={[showSidebar, setShowSidebar]}>
        {user && <DesktopSideBar />}
      </SidebarContext.Provider>
    </div>
  );
}

export default Layout;
