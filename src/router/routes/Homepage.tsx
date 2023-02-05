import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import CategoriesList from '../../components/CategoriesList';
import useCategories from '../../hooks/useCategories';
import { useUser } from '../../hooks/useUser';
import { CategoryType } from '../../types/Category.interface';
import Loadingpage from './Loadingpage';

function filterCategories(
  query: string,
  data?: CategoryType[]
): CategoryType[] {
  if (!data) {
    return [];
  }

  const reg = new RegExp(query, 'gi');

  const result = data
    .filter((category) => {
      category.items.find((item) => {
        return item.name.match(reg);
      });
    })
    .map(({ id, items, name }) => {
      return {
        id,
        name,
        items: items.filter((item) => item.name.match(reg)),
      };
    });

  return result;
}

function Homepage() {
  const { user } = useUser();
  const { data, isLoading, error } = useCategories(user?.uid);
  const [searchQ, setSearchQ] = useState('');

  const filteredCategories = useMemo(
    () => filterCategories(searchQ, data),
    [data, searchQ]
  );

  if (error) {
    return <div>Error occured</div>;
  }

  if (isLoading) {
    return <Loadingpage />;
  }

  return (
    <div className='flex flex-col px-3 py-8 md:px-6 lg:px-20'>
      <header className='mb-8 flex w-full flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-4 lg:space-y-0'>
        <h1 className='text-xl font-medium text-neutral-dark lg:text-2xl xl:text-4xl'>
          <span className='text-primary '>Shoppingify</span> allows you take
          your shopping list wherever you go
        </h1>
        <div className='group flex h-min w-full max-w-[330px] items-center overflow-hidden rounded-xl bg-white text-sm focus-within:outline focus-within:outline-2 focus-within:outline-primary'>
          <MagnifyingGlassIcon className='ml-4 h-6 w-6 text-neutral-dark group-focus-within:text-primary' />
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value.trim())}
            type='text'
            className='flex-grow p-4 focus:outline-none'
            placeholder='search item'
          />
        </div>
      </header>
      <div className='flex w-full flex-col'>
        <CategoriesList categories={filteredCategories} />
      </div>
    </div>
  );
}

export default Homepage;
