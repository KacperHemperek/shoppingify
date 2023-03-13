import { queryClient } from '@/App';
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
    await fetchFn({
      url: '/api/session/new',
      body: { email, name, password },
      method: 'POST',
    });
  };

  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export default useSignUp;
