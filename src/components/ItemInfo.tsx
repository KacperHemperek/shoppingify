import { useMutation } from '@tanstack/react-query';
import useSidebar from '@/hooks/useSidebar';
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { Item } from '@/types/Item.interface';
import { db } from '@/lib/firebase';
import { queryClient } from '@/App';
import { useUser } from '@/hooks/useUser';

const useDeleteItem = () => {
  const { user } = useUser();

  const deleteItem = async ({
    item,
    categoryId,
  }: {
    item: Item | null;
    categoryId: string | null;
  }) => {
    if (!categoryId || !item) {
      throw new Error('No item or category provided');
    }
    const categoryRef = doc(collection(db, 'categories'), categoryId);

    const itemToDelete = { id: item.id, name: item.name, desc: item.desc };

    await updateDoc(categoryRef, {
      items: arrayRemove(itemToDelete),
    });
  };

  return useMutation({
    mutationFn: deleteItem,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['categories', user?.uid],
      });
    },
  });
};

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className='flex w-fit font-semibold text-primary' onClick={onClick}>
      <div className='mr-2'>&#8592;</div>
      <div>back</div>
    </button>
  );
}

function ItemInfo() {
  const { item, categoryId, setSidebarOption } = useSidebar();
  const { mutateAsync, isLoading } = useDeleteItem();

  const { hide } = useSidebar();

  return (
    <div className='absolute top-0 left-0 flex h-screen w-full max-w-md flex-col justify-between bg-white py-8 px-6 xl:p-8'>
      <div className=''>
        <div className='hidden md:block'>
          <BackButton onClick={() => hide()} />
        </div>
        <div className='md:hidden'>
          <BackButton onClick={() => hide(true)} />
        </div>
        <div className='my-5'>
          <h3 className='mb-2 text-xs font-medium text-neutral-light'>name</h3>
          <span className='text-2xl font-medium'>{item?.name}</span>
        </div>
        <div className='my-5'>
          <h3 className='mb-2 text-xs font-medium text-neutral-light'>
            category
          </h3>
          <span className='text-lg font-medium'>{item?.category}</span>
        </div>
        <div className='my-5'>
          <h3 className='mb-2 text-xs font-medium text-neutral-light'>note</h3>

          <span className='text-lg font-medium'>{item?.desc}</span>
        </div>
      </div>
      <div className='flex space-x-6 self-center'>
        {/* mobile button */}
        <button
          type='button'
          className='rounded-xl px-6 py-4 font-medium shadow-danger/30 transition hover:scale-[101%] hover:bg-danger hover:text-white hover:shadow-md md:hidden'
          onClick={async () => {
            await mutateAsync({ item, categoryId });
            setSidebarOption(undefined);
          }}
        >
          delete
        </button>
        {/* desktop button */}
        <button
          type='button'
          className='hidden rounded-xl px-6 py-4 font-medium shadow-danger/30 transition hover:scale-[101%] hover:bg-danger hover:text-white hover:shadow-md md:block'
          onClick={async () => {
            await mutateAsync({ item, categoryId });
            setSidebarOption('cart');
          }}
        >
          delete
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='submit-button px-6 py-4'
        >
          Add to list
        </button>
      </div>
    </div>
  );
}

export default ItemInfo;
