import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../App';
import { CategoryType } from '../types/Category.interface';

type AddItemType = {
  name: string;
  desc: string;
  category: { id: string; value: string };
};

function useAddItem() {
  const mutationFn = async ({ name, desc, category }: AddItemType) => {};

  return useMutation({
    mutationFn,
  });
}

export default useAddItem;
