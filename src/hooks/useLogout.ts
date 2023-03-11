import { fetchFn } from '@/utils/fetchFunction';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const user = await fetchFn({ url: '/api/session', method: 'DELETE' });

      console.log(user);
    },
  });
}
