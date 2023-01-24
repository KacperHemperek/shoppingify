import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import useItemInfoContext from '../hooks/useItemInfoContext';
import ItemInfo from './ItemInfo';

const x = '100%';

const variants = {
  enter: {
    x,
  },
  center: {
    x: 0,
  },
  exit: {
    x,
  },
};

function DesktopSideBar({ showAddItem }: { showAddItem: boolean }) {
  const { isShown: isItemInfoShown, hide, item } = useItemInfoContext();

  return (
    <div className='hidden overflow-hidden md:block'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          variants={variants}
          animate={'center'}
          initial={'enter'}
          exit={'exit'}
          key={showAddItem ? 'addItemForm' : 'cart'}
          custom={showAddItem ? -1 : 1}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className='fixed h-screen  w-full bg-neutral-extralight md:relative md:w-96 md:max-w-sm'
        >
          {showAddItem ? (
            <div className='-z-10 h-full bg-white'>Add item form</div>
          ) : (
            <div className='-z-10 h-full bg-primary-light'>Cart</div>
          )}
          {isItemInfoShown && item && <ItemInfo item={item} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default DesktopSideBar;
