import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  ChartBarSquareIcon,
  ListBulletIcon,
  PlusIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '../hooks/useUser';
import NavOption from './NavOption';
import Logo from '../assets/logo.svg';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useSidebarContext } from '../layouts/layout';

function NavBar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showAddItem, setShowAddItem] = useSidebarContext();

  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
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
          className='mb-6 rounded-full bg-success p-3'
          onClick={() => setShowAddItem(true)}
        >
          <PlusIcon className='h-6 w-6 text-white' />
        </button>
        <button
          className='rounded-full bg-primary p-3'
          onClick={() => setShowAddItem(false)}
        >
          <ShoppingCartIcon className='h-6 w-6 text-white' />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
