import { motion, AnimatePresence } from 'framer-motion';
import useItemInfoContext from '../hooks/useItemInfoContext';
import { useSidebarContext } from '../layouts/layout';
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
function DesktopSideBar() {
  const { isShown: isItemInfoShown, item } = useItemInfoContext();

  const [showAddItem] = useSidebarContext();

  const keyForAnimation = isItemInfoShown
    ? 'itemInfo'
    : showAddItem
    ? 'addItem'
    : 'cart';

  return (
    <div className='fixed left-[72px] w-[calc(100%-72px)] md:static md:w-full md:max-w-[300px] xl:max-w-sm'>
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.div
          variants={variants}
          animate={'center'}
          initial={'enter'}
          exit={'exit'}
          key={keyForAnimation}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className='h-screen bg-neutral-extralight md:relative '
        >
          {showAddItem ? (
            <AddItemForm />
          ) : (
            <div className='flex h-full bg-primary-light' key={'cart'}>
              Cart
            </div>
          )}

          {isItemInfoShown && item && <ItemInfo item={item} key={'itemInfo'} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SideBar() {
  const { isShown: isItemInfoShown, item } = useItemInfoContext();

  const [showAddItem] = useSidebarContext();

  const keyForAnimation = isItemInfoShown
    ? 'itemInfo'
    : showAddItem
    ? 'addItem'
    : 'cart';

  return <DesktopSideBar />;
}

export default SideBar;
