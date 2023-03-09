import { useMutation } from '@tanstack/react-query';
import useSidebar from '@/hooks/useSidebar';
import { Item } from '@/types/Item.interface';

const useDeleteItem = (item: Item) => {
  const deleteItem = async (item: Item) => {};

  return useMutation({ mutationFn: deleteItem });
};

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className='flex w-fit font-semibold text-primary' onClick={onClick}>
      <div className='mr-2'>&#8592;</div>
      <div>back</div>
    </button>
  );
}

function ItemInfo({ item }: { item: Item }) {
  const { hide } = useSidebar();
  //TODO: add delete item functionality on delete button
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
          <span className='text-2xl font-medium'>{item.name}</span>
        </div>
        <div className='my-5'>
          <h3 className='mb-2 text-xs font-medium text-neutral-light'>
            category
          </h3>
          <span className='text-lg font-medium'>{item.category}</span>
        </div>
        <div className='my-5'>
          <h3 className='mb-2 text-xs font-medium text-neutral-light'>note</h3>

          <span className='text-lg font-medium'>{item.desc}</span>
        </div>
      </div>
      <div className='flex space-x-6 self-center'>
        <button
          type='button'
          className='rounded-xl px-6 py-4 font-medium transition hover:bg-danger hover:text-white'
          onClick={() => {
            console.log('delete item ' + item.name);

            // setSidebarOption('cart');
          }}
        >
          delete
        </button>
        <button
          type='submit'
          className='self-center rounded-xl bg-primary px-6 py-4 font-medium text-white transition hover:bg-primary/80'
        >
          Add to list
        </button>
      </div>
    </div>
  );
}

export default ItemInfo;
