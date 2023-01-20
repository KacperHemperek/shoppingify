import { AnimatePresence, motion } from 'framer-motion';
import { XCircleIcon } from '@heroicons/react/24/outline';

const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { delay: 0, duration: 0.15 },
      height: { delay: 0.3 },
    },
  },
};

function ErrorAlert({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={variants}
          key='errorMessage'
          initial={'initial'}
          animate={'animate'}
          exit={'exit'}
          transition={{
            opacity: { duration: 0.3, delay: 0.3 },
            height: { duration: 0.3 },
          }}
          className='flex w-full  items-center space-x-3 font-semibold text-neutral-dark'
        >
          <div className='flex w-full items-center space-x-3 rounded-lg  bg-red-200 p-2 font-semibold text-neutral-dark'>
            <XCircleIcon className='h-10 w-10 text-neutral-dark' />
            <div className='flex w-full flex-col '>
              <h4 className=' text-xl font-bold'>Error</h4>
              <span className='text-sm'>{text}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorAlert;
