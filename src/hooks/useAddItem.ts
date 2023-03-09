import { useMutation } from '@tanstack/react-query';

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
