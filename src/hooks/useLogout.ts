import { queryClient } from '@/App';
import { User } from '@/context/UserContext';
import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await fetchFn({ url: '/api/session', method: 'DELETE' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
