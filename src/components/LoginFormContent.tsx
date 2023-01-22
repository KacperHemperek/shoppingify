import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { formatFireabseAuthError } from '../helpers/firebaseError';
import useLogin from '../hooks/useLogin';
import useLoginWithGithub from '../hooks/useLoginWithGithub';
import useLoginWithGoogle from '../hooks/useLoginWithGoogle';
import ErrorAlert from './ErrorAlert';
import FormSubmitButton from './FormSubmitButton';
import { motion } from 'framer-motion';

type LoginFormInput = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginFormContent() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormInput>({ resolver: zodResolver(schema) });

  const { mutateAsync: login, isLoading: loading, isError, error } = useLogin();
  const { mutate: loginWithGoogle, error: googleError } = useLoginWithGoogle();
  const { mutate: loginWithGithub, error: githubError } = useLoginWithGithub();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.form
        className='flex w-full flex-col '
        onSubmit={handleSubmit(onSubmit)}
      >
        <ErrorAlert
          text={formatFireabseAuthError(error as FirebaseError)}
          visible={isError && error instanceof FirebaseError}
        />

        <label htmlFor='email' className='label'>
          <span className='mb-2 '>Email</span>
          <input
            type='text'
            className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an email'}
            {...register('email')}
          />
        </label>
        <label htmlFor='email' className='label mb-4'>
          <span className='mb-2 mt-6'>Password</span>
          <input
            type='password'
            className='w-full rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter a password'}
            {...register('password')}
          />
        </label>
        <div className='mt-6'>
          <FormSubmitButton
            buttonText='Login'
            isValid={isValid}
            loading={loading}
          />
        </div>
        <div className='mt-6 flex w-full justify-evenly space-x-6'>
          <button
            className='flex w-full items-center justify-center rounded-xl bg-[#171515] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md hover:shadow-[#171515]/30'
            onClick={() => loginWithGithub()}
            type='button'
          >
            <SiGithub className='mr-2' /> Github
          </button>
          <button
            className='hover:[#4c8bf5]/30 flex w-full items-center justify-center rounded-xl bg-[#4c8bf5] p-4 font-semibold text-white transition-all hover:scale-[101%] hover:shadow-md'
            onClick={() => loginWithGoogle()}
            type='button'
          >
            <SiGoogle className='mr-2' />
            Google
          </button>
        </div>
      </motion.form>
    </>
  );
}

export default LoginFormContent;
