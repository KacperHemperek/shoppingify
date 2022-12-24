import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

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
          layout={'size'}
          className='mx-auto flex w-full max-w-sm flex-col items-center space-y-6 rounded-xl border border-primary bg-white p-8 shadow-lg shadow-primary/30'
        >
          <motion.div
            animate={formType}
            initial={formType}
            className='relative flex w-full justify-evenly space-x-1 overflow-hidden rounded-xl border-2 border-primary bg-primary-light p-1'
          >
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
          </motion.div>
          <label
            htmlFor='email'
            className='flex w-full flex-col text-sm font-medium text-neutral-dark'
          >
            Email
            <span className='mb-2'></span>
            <input
              name='email'
              type='text'
              className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
              placeholder={'Enter an email'}
            />
          </label>
          <label
            htmlFor='email'
            className='mb-4 flex w-full flex-col text-sm font-medium text-neutral-dark'
          >
            Password
            <span className='mb-2'></span>
            <input
              type='text'
              className='w-full rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
              placeholder={'Enter a password'}
            />
          </label>
          <button className='w-full rounded-xl bg-primary p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md hover:shadow-primary/30'>
            Login
          </button>
          <div className='flex w-full justify-evenly space-x-6'>
            <button className='flex w-full items-center justify-center rounded-xl bg-[#171515] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md hover:shadow-[#171515]/30'>
              <SiGithub className='mr-2' /> Github
            </button>
            <button className='hover:[#4c8bf5]/30 flex w-full items-center justify-center rounded-xl bg-[#4c8bf5] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md'>
              <SiGoogle className='mr-2' />
              Google
            </button>
          </div>
        </motion.div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
