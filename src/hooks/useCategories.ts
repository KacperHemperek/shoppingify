import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function useCategories(id: string = 'GANJYVI3JF0Zi8HZM3X0') {
  const getCategories = async (id: string) => {
    const snapshot = await getDocs(collection(db, `users`));
  };

  return useQuery({ queryFn: () => getCategories(id) });
}

export default useCategories;
