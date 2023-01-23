import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';

const ItemCard = React.forwardRef(
  ({ item, delay = 0.6 }: { item: string; delay?: number }, ref) => {
    return (
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: delay,
          layout: {
            delay: 0.2,
          },
        }}
        exit={{ opacity: 0, y: -10 }}
        layout={'position'}
        className='flex h-min items-center justify-between space-x-4 rounded-xl bg-white p-5  shadow-md'
      >
        <span className='font-medium'>{item}</span>
        <div>
          <PlusIcon className='h-6 w-6 text-neutral' />
        </div>
      </motion.div>
    );
  }
);

export default ItemCard;
