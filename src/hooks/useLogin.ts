import { queryClient } from '@/App';
import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

function useLogin() {
  const loginEmail = async (userInput: { email: string; password: string }) => {
    const res = await fetchFn({
      url: '/api/session',
      body: {
        email: userInput.email,
        password: userInput.password,
      },
      method: 'POST',
    });

    return res;
  };

  return useMutation({
    mutationFn: loginEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export default useLogin;
