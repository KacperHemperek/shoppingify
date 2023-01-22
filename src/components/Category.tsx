import React from 'react';
import ItemCard from './ItemCard';

function Category({ items, name }: { name: string; items: string[] }) {
  return (
    <div className=' mb-12'>
      <h2 className='mb-6 text-lg font-medium text-black md:text-xl'>{name}</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {items.map((item) => (
          <ItemCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Category;
