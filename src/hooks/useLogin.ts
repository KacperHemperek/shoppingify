import { queryClient } from '@/App';
import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

function useLogin() {
  const loginEmail = async (userInput: { email: string; password: string }) => {
    await fetchFn({
      url: '/api/session',
      body: {
        email: userInput.email,
        password: userInput.password,
      },
      method: 'POST',
    });
  };

  return useMutation({
    mutationFn: loginEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export default useLogin;
