import { useMutation } from '@tanstack/react-query';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../lib/firebase';

function useLoginWithGoogle() {
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (e) {
      console.error(e);
    }
  };

  return useMutation({
    mutationFn: loginWithGoogle,
  });
}

export default useLoginWithGoogle;
