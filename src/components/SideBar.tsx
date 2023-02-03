import { motion, AnimatePresence } from 'framer-motion';
import useItemInfoContext from '../hooks/useItemInfoContext';
import AddItem from './AddItem';
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
  const { isShown: isItemInfoShown, item } = useItemInfoContext();

  const keyForAnimation = isItemInfoShown
    ? 'itemInfo'
    : showAddItem
    ? 'addItem'
    : 'cart';

  return (
    <div className='hidden overflow-hidden md:block md:w-96 lg:w-full lg:max-w-sm'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          variants={variants}
          animate={'center'}
          initial={'enter'}
          exit={'exit'}
          key={keyForAnimation}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className='h-screen  bg-neutral-extralight md:relative '
        >
          {showAddItem ? (
            <AddItem />
          ) : (
            <div className='-z-10 h-full bg-primary-light' key={'cart'}>
              Cart
            </div>
          )}

          {isItemInfoShown && item && <ItemInfo item={item} key={'itemInfo'} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default DesktopSideBar;
