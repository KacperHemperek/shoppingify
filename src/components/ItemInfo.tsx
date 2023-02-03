import useItemInfoContext from '../hooks/useItemInfoContext';
import { Item } from '../types/Item.interface';

function ItemInfo({ item }: { item: Item }) {
  const { hide } = useItemInfoContext();

  return (
    <div className='absolute top-0 left-0 flex h-screen w-full max-w-md flex-col  bg-white'>
      <button className='w-fit  font-semibold text-primary' onClick={hide}>
        &#8592; back
      </button>
      <div>{item.name}</div>
      <div>{item.category}</div>
      <div>{item.desc}</div>
    </div>
  );
}

export default ItemInfo;
