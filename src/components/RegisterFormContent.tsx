import { SiGithub, SiGoogle } from 'react-icons/si';

function RegisterFormContent() {
  return (
    <>
      <label htmlFor='email' className='label'>
        Email
        <span className='mb-2'></span>
        <input
          name='email'
          type='email'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter an email'}
        />
      </label>
      <label htmlFor='name' className='label'>
        Name
        <span className='mb-2'></span>
        <input
          name='name'
          type='text'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter your name'}
        />
      </label>
      <label htmlFor='password' className='label mb-4'>
        Password
        <span className='mb-2'></span>
        <input
          name='password'
          type='text'
          className='w-full rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter a password'}
        />
      </label>
      <button className='w-full rounded-xl bg-primary p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md hover:shadow-primary/30'>
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
    </>
  );
}

export default RegisterFormContent;
