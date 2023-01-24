import React, { PropsWithChildren, useState } from 'react';
import { Item } from '../types/Item.interface';

type ItemInfoContextType = {
  item: Item | null;
  isShown: boolean;
  show: (item: Item) => void;
  hide: () => void;
};

export const ItemInfoContext = React.createContext<ItemInfoContextType>({
  item: null,
  isShown: false,
  show: () => {},
  hide: () => {},
});

function ItemInfoContextProvider({ children }: PropsWithChildren) {
  const [isShown, setIsShown] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const show = (newItem: Item) => {
    setItem(newItem);
    setIsShown(true);
  };

  const hide = () => {
    setIsShown(false);
  };

  return (
    <ItemInfoContext.Provider value={{ isShown, hide, show, item }}>
      {children}
    </ItemInfoContext.Provider>
  );
}

export default ItemInfoContextProvider;
