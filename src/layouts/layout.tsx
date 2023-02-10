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
import NavBar from '../components/NavBar';

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
  const { user } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={[showSidebar, setShowSidebar]}>
      <div className='flex h-screen w-screen bg-neutral-extralight'>
        <NavBar />
        <main className='scrollbar flex h-screen w-full overflow-y-auto bg-neutral-extralight'>
          <RouteGuard />
        </main>
        {user && <DesktopSideBar />}
      </div>
    </SidebarContext.Provider>
  );
}

export default Layout;
