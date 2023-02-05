import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryType } from '../types/Category.interface';

function useCategories(userId?: string) {
  const getCategories = async (userId?: string): Promise<CategoryType[]> => {
    const result: CategoryType[] = [];
    if (!userId) {
      return result;
    }

    try {
      const userRef = doc(collection(db, `users`), userId);
      const q = query(
        collection(db, 'categories'),
        where('user_ref', '==', userRef)
      );

      const categoriesSnapshot = await getDocs(q);
      categoriesSnapshot.forEach(async (doc) => {
        const docData = doc.data();

        result.push({
          id: doc.id,
          name: docData.name,
          items: docData.items.map((item: { name: string; desc: string }) => ({
            ...item,
            category: docData.name,
          })),
        });
      });
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  return useQuery({
    queryFn: async () => getCategories(userId),
    queryKey: ['categories', userId],
  });
}

export default useCategories;
