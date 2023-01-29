import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React from 'react';
import useItemInfoContext from '../hooks/useItemInfoContext';
import { Item } from '../types/Item.interface';

const ItemCard = React.forwardRef(
  ({ item, delay = 0.6 }: { item: Item; delay?: number }, ref) => {
    const { show } = useItemInfoContext();

    return (
      <motion.div
        onClick={() => show(item as any)}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay } }}
        transition={{
          layout: {
            delay: 0.2,
          },
        }}
        exit={{ opacity: 0, y: -10 }}
        layout={'position'}
        className='flex h-min items-center justify-between space-x-4 rounded-xl bg-white p-5  shadow-md'
      >
        <span className='font-medium'>{item.name}</span>
        <div>
          <PlusIcon className='h-6 w-6 text-neutral' />
        </div>
      </motion.div>
    );
  }
);

export default ItemCard;
