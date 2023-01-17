import HeroImage from '../../assets/undraw_my_password_re_ydq7.svg';
import { useNavigate } from 'react-router-dom';

function NotLoggedIn() {
  const navigate = useNavigate();

  return (
    <div className='flex h-full flex-col items-center justify-center bg-neutral-extralight lg:flex-row'>
      <div className='space-y-6 p-8'>
        <h1 className='text-4xl font-bold  md:text-6xl'>Sorry</h1>
        <p className='md:text-lg '>You must be logged in to see that page</p>

        <button
          className='rounded-lg bg-success py-2 px-4 font-semibold text-white  md:px-6 md:py-4'
          onClick={() => navigate('login')}
        >
          {' '}
          Login
        </button>
      </div>
      <img
        className='w-80 p-8 md:p-0'
        src={HeroImage}
        alt='not logged in hero image'
      />
    </div>
  );
}

export default NotLoggedIn;
