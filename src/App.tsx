import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SiGithub, SiGoogle } from 'react-icons/si';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen flex flex-col justify-center bg-primary-light '>
        <div className='max-w-sm w-full flex flex-col items-center space-y-6 mx-auto shadow-lg shadow-primary/30 p-8 bg-white rounded-xl border border-primary'>
          <h1 className='text-neutral-dark text-4xl mb-4 font-bold'>Login</h1>
          <label
            htmlFor='email'
            className='text-neutral-dark font-medium w-full flex text-sm flex-col'
          >
            Email
            <span className='mb-2'></span>
            <input
              name='email'
              type='text'
              className=' p-4 rounded-xl border-2 border-neutral-light placeholder:text-sm placeholder:text-neutral-light outline-2 outline-primary focus:placeholder:text-primary transition-all'
              placeholder={'Enter an email'}
            />
          </label>
          <label
            htmlFor='email'
            className='text-neutral-dark mb-4 font-medium w-full flex text-sm flex-col'
          >
            Password
            <span className='mb-2'></span>
            <input
              type='text'
              className='w-full p-4 rounded-xl border-2 border-neutral-light placeholder:text-sm placeholder:text-neutral-light outline-2 outline-primary focus:placeholder:text-primary transition-all'
              placeholder={'Enter a password'}
            />
          </label>
          <button className='bg-primary text-white font-semibold p-4 w-full rounded-xl hover:scale-[101%] hover:shadow-md hover:shadow-primary/30 transition-all'>
            Login
          </button>
          <div className='flex justify-evenly space-x-6 w-full'>
            <button className='bg-[#171515] flex items-center justify-center text-white font-semibold p-4 w-full rounded-xl hover:scale-[101%] hover:shadow-md hover:shadow-[#171515]/30 transition-all'>
              <SiGithub className='mr-2' /> Github
            </button>
            <button className='bg-[#4c8bf5] text-white flex items-center justify-center font-semibold p-4 w-full rounded-xl hover:scale-[101%] hover:shadow-md hover:[#4c8bf5]/30 transition-all'>
              <SiGoogle className='mr-2' />
              Google
            </button>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
