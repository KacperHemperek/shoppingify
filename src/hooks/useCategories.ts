import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryType } from '../types/Category.interface';

function useCategories(id: string) {
  const getCategories = async (id: string) => {
    const result: CategoryType[] = [];
    try {
      const snapshot = await getDocs(collection(db, `users/${id}/categories`));
      snapshot.forEach((doc: any) => {
        result.push(doc.data());
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
