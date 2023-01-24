import { useContext } from 'react';
import { ItemInfoContext } from '../context/ItemInfoContext';

function useItemInfoContext() {
  return useContext(ItemInfoContext);
}

export default useItemInfoContext;
