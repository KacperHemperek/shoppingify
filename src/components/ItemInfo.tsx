import useItemInfoContext from '../hooks/useItemInfoContext';
import { Item } from '../types/Item.interface';

function ItemInfo({ item }: { item: Item }) {
  const { hide } = useItemInfoContext();

  return (
    <div className='absolute top-0 left-0 flex h-screen w-full max-w-md flex-col  bg-white'>
      <button onClick={hide}>back</button>
      <div>{item.name}</div>
      <div>{item.category}</div>
      <div>{item.desc}</div>
      <div className='relative'>
        <img src={item.img} alt={item.name} className='object-cover' />
      </div>
    </div>
  );
}

export default ItemInfo;
