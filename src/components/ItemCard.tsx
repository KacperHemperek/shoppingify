import { PlusIcon } from '@heroicons/react/24/outline';

function ItemCard({ item }: { item: string }) {
  return (
    <div className='flex h-min items-center justify-between space-x-4 rounded-xl bg-white p-5 shadow-md'>
      <span>{item}</span>
      <PlusIcon className='h-6 w-6 text-neutral' />
    </div>
  );
}

export default ItemCard;
