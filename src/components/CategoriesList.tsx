import React from 'react';
import { CategoryType } from '../types/Category.interface';
import Category from './Category';

function CategoriesList({ categories }: { categories?: CategoryType[] }) {
  if (!categories || !categories?.length) {
    return <div>Sorry no data was found</div>;
  }

  return (
    <div>
      {categories.map((category) => (
        <Category key={category.name} {...category} />
      ))}
    </div>
  );
}

export default CategoriesList;
