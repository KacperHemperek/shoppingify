import { queryClient } from '@/App';
import { User } from '@/context/UserContext';
import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

function useLogin() {
  const loginEmail = async (userInput: { email: string; password: string }) => {
    try {
      const user = await fetchFn({
        url: '/api/session',
        body: {
          email: userInput.email,
          password: userInput.password,
        },
        method: 'POST',
      });

      return user;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return useMutation({
    mutationFn: loginEmail,

    onSettled: (user) => {
      console.log(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export default useLogin;
