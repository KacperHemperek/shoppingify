import { motion, AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import useSidebar from '../hooks/userSidebar';
import { ShowAddItemOptions, useSidebarContext } from '../layouts/layout';
import AddItemForm from './AddItem';
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
    x: 0,
  },
};

//TODO: Make sidebar work on mobile (logic and styles)

function DesktopSideBar() {
  const { sidebarOption, item } = useSidebar();

  return (
    <div className='fixed left-[72px] w-[calc(100%-72px)] md:static md:w-full md:max-w-[300px] xl:max-w-sm'>
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.div
          variants={variants}
          animate={'center'}
          initial={'enter'}
          exit={'exit'}
          key={sidebarOption}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className='h-screen bg-neutral-extralight md:relative '
        >
          {sidebarOption === 'addItem' && <AddItemForm key='addItem' />}
          {sidebarOption === 'cart' && (
            <div className='flex h-full bg-primary-light' key={'cart'}>
              Cart
            </div>
          )}
          {sidebarOption === 'itemInfo' && item && (
            <ItemInfo item={item} key={'itemInfo'} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SideBar() {
  return <DesktopSideBar />;
}

export default SideBar;
