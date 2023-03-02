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
    try{
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log(cred);
    
    } catch(err: any) {
      console.error(err);
      
    }

  };

  return useMutation({
    mutationFn: loginEmail,
  });
}

export default useLogin;
