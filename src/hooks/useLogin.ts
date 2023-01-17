import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

function useLogin() {
  const loginEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return useMutation({
    mutationFn: loginEmail,
  });
}

export default useLogin;
