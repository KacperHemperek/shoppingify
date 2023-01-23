import React from 'react';
import { CategoryType } from '../types/Category.interface';
import ItemCard from './ItemCard';
import { motion } from 'framer-motion';

function Category({ items, name }: CategoryType) {
  return (
    <div className=' mb-12'>
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className='mb-6 text-lg font-medium text-black md:text-xl'
      >
        {name}
      </motion.h2>
      <motion.div
        transition={{ delayChildren: 0.3 }}
        className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      >
        {items.map((item, i) => (
          <ItemCard item={item} delay={i * 0.2 + 0.6} key={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default Category;
