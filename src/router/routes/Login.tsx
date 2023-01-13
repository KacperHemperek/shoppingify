import { motion, AnimatePresence, AnimationProps } from 'framer-motion';
import React, { useState } from 'react';
import LoginFormContent from '../../components/LoginFormContent';
import RegisterFormContent from '../../components/RegisterFormContent';

const X_WIDTH = 500;

const variants = {
  login: {
    left: 0,
  },
  register: {
    left: 'calc(50% - 4px)',
  },
};

const variantsPresence: AnimationProps['variants'] = {
  initial: (right: boolean) => ({
    x: right ? -X_WIDTH : X_WIDTH,
  }),
  animate: { x: 0 },
  exit: (right: boolean) => ({
    x: right ? -X_WIDTH : X_WIDTH,
  }),
};
function Login() {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const isLogin = formType === 'login';

  const swapForm = (value: 'login' | 'register') => {
    if (formType === value) {
      return;
    }
    setFormType(value);
  };

  return (
    <div className='flex min-h-screen flex-col justify-center bg-neutral-extralight  '>
      <motion.div
        animate={formType}
        initial={formType}
        layout
        className='mx-auto flex w-full max-w-sm flex-col items-center space-y-6 overflow-hidden rounded-xl bg-white p-8 shadow-primary/30 md:border md:border-primary md:shadow-lg'
      >
        <motion.div
          layout={'position'}
          className='relative flex w-full justify-evenly space-x-1 overflow-hidden rounded-xl border-2 border-primary bg-primary-light p-1'
        >
          <div
            className={`${
              isLogin ? 'text-white' : 'text-primary'
            }  transition-color z-10 h-full w-full cursor-pointer bg-transparent p-2 text-center text-lg font-semibold`}
            onClick={() => swapForm('login')}
          >
            Login
          </div>
          <div
            className={`${
              !isLogin ? 'text-white' : 'text-primary'
            }  transition-color z-10 h-full w-full cursor-pointer bg-transparent p-2 text-center text-lg  font-semibold`}
            onClick={() => swapForm('register')}
          >
            Register
          </div>

          <motion.div
            variants={variants}
            transition={{ duration: 0.3 }}
            className='absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-primary'
          />
        </motion.div>

        <AnimatePresence initial={false} mode={'wait'}>
          <motion.div
            key={isLogin ? 'loginFormContent' : 'registerFormContent'}
            className='w-full '
            variants={variantsPresence}
            animate={'animate'}
            exit={'exit'}
            initial={'initial'}
            custom={isLogin}
            layout
            transition={{ duration: 0.2 }}
          >
            {isLogin ? (
              <LoginFormContent key={'loginFormContent'} />
            ) : (
              <RegisterFormContent key={'registerFormContent'} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Login;
