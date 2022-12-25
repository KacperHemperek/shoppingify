import { useMutation } from '@tanstack/react-query';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { auth } from '../lib/firebase';

function useSignUp() {
  const signUp = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: name });
    } catch (err: any) {
      console.log(err);
      throw new Error(err.code);
    }
  };

  return useMutation({ mutationFn: signUp });
}

export default useSignUp;
