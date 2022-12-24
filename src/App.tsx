import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import LoginFormContent from './components/LoginFormContent';
import RegisterFormContent from './components/RegisterFormContent';

const queryClient = new QueryClient();

const variantsPresence: AnimationProps['variants'] = {
  initial: {
    x: 1000,
  },
  animate: { x: 0 },
  exit: {
    x: -1000,
  },
};

const variants = {
  login: {
    left: 0,
  },
  register: {
    left: 'calc(50% - 4px)',
  },
};

function App() {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const isLogin = formType === 'login';

  const swapForm = (value: 'login' | 'register') => {
    if (formType === value) {
      return;
    }
    setFormType(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-screen flex-col justify-center bg-primary-light '>
        <motion.div
          animate={formType}
          initial={formType}
          className='mx-auto flex w-full max-w-sm flex-col items-center space-y-6 overflow-hidden rounded-xl border border-primary bg-white p-8 shadow-lg shadow-primary/30'
        >
          <div className='relative flex w-full justify-evenly space-x-1 overflow-hidden rounded-xl border-2 border-primary bg-primary-light p-1'>
            <div
              className={`${
                isLogin ? 'text-white' : 'text-primary'
              }  z-10 h-full w-full cursor-pointer bg-transparent p-2 text-center text-lg font-semibold transition-all`}
              onClick={() => swapForm('login')}
            >
              Login
            </div>
            <div
              className={`${
                !isLogin ? 'text-white' : 'text-primary'
              }  z-10 h-full w-full cursor-pointer bg-transparent p-2 text-center text-lg font-semibold  transition-all`}
              onClick={() => swapForm('register')}
            >
              Register
            </div>

            <motion.div
              variants={variants}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              className='absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-primary'
            />
          </div>
          {/* FIXME: make forms slide from proper side */}
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.form
              key={isLogin ? 'loginFormContent' : 'registerFormContent'}
              className='flex w-full flex-col space-y-6'
              variants={variantsPresence}
              animate={'animate'}
              exit={'exit'}
              initial={'initial'}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? (
                <LoginFormContent key={'loginFormContent'} />
              ) : (
                <RegisterFormContent key={'registerFormContent'} />
              )}
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
