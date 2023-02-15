import React, { PropsWithChildren, useCallback, useState } from 'react';
import { ShowAddItemOptions } from '../layouts/layout';
import { Item } from '../types/Item.interface';

type SidebarContextType = {
  item: Item | null;
  show: (item: Item) => void;
  hide: () => void;
  sidebarOption: ShowAddItemOptions | undefined;
  setSidebarOption: React.Dispatch<
    React.SetStateAction<ShowAddItemOptions | undefined>
  >;
};

export const ItemInfoContext = React.createContext<SidebarContextType>({
  item: null,
  show: () => {},
  hide: () => {},
  sidebarOption: undefined,
  setSidebarOption: () => {},
});

function SidebarContextProvider({ children }: PropsWithChildren) {
  const [sidebarOption, setSidebarOption] = useState<
    ShowAddItemOptions | undefined
  >('cart');
  const [item, setItem] = useState<Item | null>(null);

  const show = useCallback((item: Item) => {
    setItem(item);
    setSidebarOption('itemInfo');
  }, []);

  const hide = () => {
    setItem(null);
    setSidebarOption('cart');
  };

  return (
    <ItemInfoContext.Provider
      value={{ sidebarOption, setSidebarOption, item, show, hide }}
    >
      {children}
    </ItemInfoContext.Provider>
  );
}

export default SidebarContextProvider;
