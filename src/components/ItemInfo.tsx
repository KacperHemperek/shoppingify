import useSidebar from '../hooks/userSidebar';
import { Item } from '../types/Item.interface';
import { motion } from 'framer-motion';

function ItemInfo({ item }: { item: Item }) {
  const { hide } = useSidebar();

  return (
    <div className='absolute top-0 left-0 flex h-screen w-full max-w-md flex-col bg-white p-8'>
      <button className='flex w-fit font-semibold text-primary' onClick={hide}>
        <motion.div
          className='mr-2'
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {' '}
          &#8592;
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {' '}
          back
        </motion.div>
      </button>
      <div className='my-5'>
        <motion.h3
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='mb-2 text-xs font-medium text-neutral-light'
        >
          name
        </motion.h3>
        <motion.span
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='text-2xl font-medium'
        >
          {item.name}
        </motion.span>
      </div>
      <div className='my-5'>
        <motion.h3
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.51 }}
          className='mb-2 text-xs font-medium text-neutral-light'
        >
          category
        </motion.h3>
        <motion.span
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.52 }}
          className='text-lg font-medium'
        >
          {item.category}
        </motion.span>
      </div>
      <div className='my-5'>
        <motion.h3
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.53 }}
          className='mb-2 text-xs font-medium text-neutral-light'
        >
          note
        </motion.h3>

        <motion.span
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.54 }}
          className='text-lg font-medium'
        >
          {item.desc}
        </motion.span>
      </div>
    </div>
  );
}

export default ItemInfo;
