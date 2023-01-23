import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function ItemCard({ item, delay = 0.6 }: { item: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay }}
      className='flex h-min items-center justify-between space-x-4 rounded-xl bg-white p-5  shadow-md'
    >
      <span className='font-medium'>{item}</span>
      <div>
        <PlusIcon className='h-6 w-6 text-neutral' />
      </div>
    </motion.div>
  );
}

export default ItemCard;
