import { queryClient } from '@/App';
import { User } from '@/context/UserContext';
import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await fetchFn({ url: '/api/session', method: 'DELETE' });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const prevUser = queryClient.getQueryData<User | null>(['user']);

      console.log({ prevUser });

      queryClient.setQueryData(['user'], null);

      return { prevUser };
    },
    onError: (error, _, context) => {
      console.log('error when logging out');

      queryClient.setQueryData(['user'], context?.prevUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
