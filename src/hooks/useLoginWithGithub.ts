import { useMutation } from '@tanstack/react-query';
import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../lib/firebase';

function useLoginWithGithub() {
  const loginWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      signInWithRedirect(auth, provider);
    } catch (err: any) {
      throw new Error(err.code);
    }
  };

  return useMutation({ mutationFn: loginWithGithub });
}

export default useLoginWithGithub;
