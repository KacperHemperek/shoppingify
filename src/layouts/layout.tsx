import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavOption from '../components/NavOption';
import { useUser } from '../hooks/useUser';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import NotLoggedIn from '../router/routes/NotLoggedIn';
import Loadingpage from '../router/routes/Loadingpage';
import Logo from '../assets/logo.svg';
import React, { createContext, useContext, useState } from 'react';
import SideBar from '../components/SideBar';
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

export type ShowAddItemOptions = 'itemInfo' | 'addItem' | 'cart';

function Layout() {
  const { user } = useUser();

  return (
    <div className='flex h-screen w-screen overflow-x-hidden bg-neutral-extralight'>
      <NavBar />
      <main className='scrollbar flex h-screen w-full overflow-y-auto bg-neutral-extralight'>
        <RouteGuard />
      </main>
      {user && <SideBar />}
    </div>
  );
}

export default Layout;
