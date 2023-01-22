import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../hooks/useUser';

function Homepage() {
  const { user } = useUser();

  return (
    <div className='flex  flex-col px-3 py-8 text-center md:px-20'>
      <header className='flex w-full flex-col space-y-4  md:flex-row md:justify-between md:space-y-0'>
        <h1 className='text-3xl font-medium text-neutral-dark'>
          <span className='text-primary '>Shoppingify</span> allows you take
          your shopping list wherever you go
        </h1>
        <div className='group flex h-min w-full max-w-[330px] items-center overflow-hidden rounded-xl bg-white text-sm focus-within:outline focus-within:outline-2 focus-within:outline-primary'>
          <MagnifyingGlassIcon className='ml-4 h-6 w-6 text-neutral-dark group-focus-within:text-primary' />
          <input
            type='text'
            className='flex-grow p-4 focus:outline-none'
            placeholder='search item'
          />
        </div>
      </header>
    </div>
  );
}

export default Homepage;
