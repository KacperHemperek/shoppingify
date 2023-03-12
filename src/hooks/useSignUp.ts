import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

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
    const user = fetchFn({
      url: '/api/session/new',
      body: { email, name, password },
    });
  };

  return useMutation({ mutationFn: signUp });
}

export default useSignUp;
