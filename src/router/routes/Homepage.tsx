import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CategoriesList from '../../components/CategoriesList';
import { useUser } from '../../hooks/useUser';

function Homepage() {
  const { user } = useUser();

  const mockData = [
    {
      name: 'Category 1',
      items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
    },
    {
      name: 'Category 2',
      items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
    },
    {
      name: 'Category 3',
      items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
    },
    {
      name: 'Category 4',
      items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
    },
  ];

  return (
    <div className='flex  flex-col px-3 py-8 md:px-20'>
      <header className='mb-8 flex w-full flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-4 lg:space-y-0'>
        <h1 className='text-xl font-medium text-neutral-dark'>
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
      <div className='flex w-full flex-col'>
        <CategoriesList categories={mockData} />
      </div>
    </div>
  );
}

export default Homepage;
