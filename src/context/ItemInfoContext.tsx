import React, { PropsWithChildren, useState } from 'react';
import { Item } from '../types/Item.interface';

type ItemInfoContextType = {
  isShown: boolean;
  show: (item: Item) => void;
  hide: () => void;
};

export const ItemInfoContext = React.createContext<ItemInfoContextType>({
  isShown: false,
  show: () => {},
  hide: () => {},
});

function ItemInfoContextProvider({ children }: PropsWithChildren) {
  const [isShown, setIsShown] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const show = (item: Item) => {
    setItem(item);
    setIsShown(true);
  };

  const hide = () => {
    setIsShown(false);
  };

  return (
    <ItemInfoContext.Provider value={{ isShown, hide, show }}>
      {children}
    </ItemInfoContext.Provider>
  );
}

export default ItemInfoContextProvider;
