import { FieldErrors, SubmitErrorHandler, useForm } from 'react-hook-form';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import { Puff } from 'react-loader-spinner';
import React, { useState } from 'react';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const buttonVariants: AnimationProps['variants'] = {
  loading: {
    width: 'auto',
    borderRadius: '100px',
  },
  default: {
    width: '100%',
    borderRadius: '12px',
  },
};

const schema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters').trim(),
  email: z
    .string()
    .min(5, 'Email must be at least 5 characters')
    .email('This field must be a valid email')
    .trim(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/gi),
});

function RegisterFormContent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onError = async (e: FieldErrors, event?: React.BaseSyntheticEvent) => {
    console.log();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form
      className='flex w-full flex-col space-y-6'
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <label htmlFor='email' className='label'>
        Email
        <span className='mb-2'></span>
        <input
          type='email'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter an email'}
          {...register('email', { required: true })}
        />
      </label>
      <label htmlFor='name' className='label'>
        Name
        <span className='mb-2'></span>
        <input
          type='text'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter your name'}
          {...register('name', { required: true })}
        />
      </label>
      <label htmlFor='password' className='label mb-4'>
        Password
        <span className='mb-2'></span>
        <input
          type='password'
          className='w-full rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter a password'}
          {...register('password', { required: true })}
        />
      </label>
      <motion.button
        style={{ borderRadius: loading ? '100px' : '12px' }}
        layout
        className={`${loading && 'w-auto'} submit-button`}
        disabled={!isValid || loading}
      >
        {loading ? (
          <motion.div layout={'size'} className='flex max-w-[20px] self-center'>
            <Puff
              width={'20'}
              height={'20'}
              wrapperClass={''}
              color={'white'}
            />
          </motion.div>
        ) : (
          'Register'
        )}
      </motion.button>
      <div className='flex w-full justify-evenly space-x-6'>
        <button className='flex w-full items-center justify-center rounded-xl bg-[#171515] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md hover:shadow-[#171515]/30'>
          <SiGithub className='mr-2' /> Github
        </button>
        <button className='hover:[#4c8bf5]/30 flex w-full items-center justify-center rounded-xl bg-[#4c8bf5] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md'>
          <SiGoogle className='mr-2' />
          Google
        </button>
      </div>
    </form>
  );
}

export default RegisterFormContent;
