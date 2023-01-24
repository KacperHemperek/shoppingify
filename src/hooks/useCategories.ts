import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryType } from '../types/Category.interface';
import { Item } from '../types/Item.interface';

function useCategories(id?: string) {
  const getCategories = async (id?: string) => {
    const result: CategoryType[] = [];
    if (!id) {
      return result;
    }

    try {
      const snapshot = await getDocs(collection(db, `users/${id}/categories`));
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        result.push({
          name: data.name,
          items: data.items.map(
            (item: { name: string; desc: string; img: string }): Item => ({
              ...item,
              category: data.name,
            })
          ),
        });
      });
    } catch (error) {
      console.error(error);
    }

    return result;
  };

  return useQuery({
    queryFn: () => getCategories(id),
    queryKey: ['categories', id],
  });
}

export default useCategories;
