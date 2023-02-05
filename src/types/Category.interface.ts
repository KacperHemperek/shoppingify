import { Item } from './Item.interface';

export interface CategoryType {
  id: string;
  name: string;
  items: Item[];
}
