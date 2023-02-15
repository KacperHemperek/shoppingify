import { useContext } from 'react';
import { ItemInfoContext } from '../context/SidebarContext';

function useSidebar() {
  return useContext(ItemInfoContext);
}

export default useSidebar;
