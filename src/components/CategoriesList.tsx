import React from 'react';
import Category from './Category';

function CategoriesList({
  categories,
}: {
  categories: { name: string; items: string[] }[];
}) {
  return (
    <div>
      {categories.map((category) => (
        <Category {...category} />
      ))}
    </div>
  );
}

export default CategoriesList;
