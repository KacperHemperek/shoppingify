import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ArrowPathIcon,
  ListBulletIcon,
  ChartBarSquareIcon,
} from '@heroicons/react/24/outline';
import NavOption from '../components/NavOption';

function Layout() {
  const [state, setState] = useState('X');

  return (
    <div className='flex h-screen w-screen'>
      <nav className='flex flex-col justify-between'>
        <div className='p-3 md:p-6'>x</div>
        <div className='flex flex-col space-y-6 md:space-y-12'>
          <NavOption
            to={'/'}
            active={state === 'X'}
            icon={<ListBulletIcon className='h-6 w-6 text-neutral-dark' />}
            onClick={() => setState('X')}
          />
          <NavOption
            to={'history'}
            active={state === 'Y'}
            icon={<ArrowPathIcon className='h-6 w-6 text-neutral-dark' />}
            onClick={() => setState('Y')}
          />
          <NavOption
            to={'statistics'}
            active={state === 'Z'}
            icon={<ChartBarSquareIcon className='h-6 w-6 text-neutral-dark' />}
            onClick={() => setState('Z')}
          />
        </div>
        <div className='p-3 md:p-6'>
          <Link to={''}>
            <button className='rounded-full bg-primary p-3'>
              <ShoppingCartIcon className='h-6 w-6 text-white' />
            </button>
          </Link>
        </div>
      </nav>
      <main className='w-full bg-neutral-extralight'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
