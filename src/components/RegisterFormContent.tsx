import { useForm } from 'react-hook-form';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

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

  return (
    <form className='flex w-full flex-col space-y-6'>
      <label htmlFor='email' className='label'>
        Email
        <span className='mb-2'></span>
        <input
          type='email'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter an email'}
          {...register('email')}
        />
      </label>
      <label htmlFor='name' className='label'>
        Name
        <span className='mb-2'></span>
        <input
          type='text'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter your name'}
          {...register('name')}
        />
      </label>
      <label htmlFor='password' className='label mb-4'>
        Password
        <span className='mb-2'></span>
        <input
          type='text'
          className='w-full rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter a password'}
          {...register('password')}
        />
      </label>
      <button className='submit-button' disabled={!isValid}>
        Register
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
    </form>
  );
}

export default RegisterFormContent;
