import { useMutation, useQuery } from '@tanstack/react-query';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { db } from '../lib/firebase';
import DropDown, { DropdownOptionType } from './DropDown';

function useDropdownOptions() {
  const { userRefFirebase } = useUser();

  return useQuery({
    queryFn: async () => {
      if (!userRefFirebase) {
        return [];
      }
      const results: DropdownOptionType[] = [];

      const q = query(
        collection(db, 'categories'),
        where('user_ref', '==', userRefFirebase)
      );

      try {
        const categoriesSnap = await getDocs(q);

        categoriesSnap.forEach((doc) => {
          results.push({ id: doc.id, value: doc.data().name });
        });
      } catch (e: any) {
        console.error(e.message);
      }

      return results;
    },
    queryKey: ['categoriesDropdown'],
  });
}

function useAddItem() {
  return useMutation({
    mutationFn: async ({
      item,
      categoryId,
    }: {
      item: { name: string; desc: string };
      categoryId?: string;
    }) => {
      if (!categoryId) {
      }

      const categoryRef = doc(collection(db, 'categories'), categoryId);
      try {
        await updateDoc(categoryRef, {
          items: arrayUnion(item),
        });
      } catch (e: any) {
        throw new Error('there was a problem adding item to db', { cause: e });
      }
    },
  });
}

function AddItemForm() {
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const { data: options } = useDropdownOptions();
  const { mutate: addItem } = useAddItem();

  const addNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: handle wrong user input
    if (!nameRef.current?.value || !noteRef.current?.value) {
      return;
    }
    const item: { name: string; desc: string } = {
      name: nameRef.current.value,
      desc: noteRef.current.value,
    };
    const categoryId = options?.find(
      (option) => option.value.toLowerCase() === dropdownValue.toLowerCase()
    )?.id;
    console.log(categoryId, item);
    addItem({ item, categoryId });
  };

  return (
    <div className='flex h-full flex-col items-center justify-between p-8'>
      <div className='flex w-full flex-col'>
        <h1 className='mb-10 text-2xl font-medium'>Add a new item</h1>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Name</span>
          <input
            ref={nameRef}
            type='text'
            className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an name'}
          />
        </label>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Note (optional)</span>
          <textarea
            ref={noteRef}
            rows={3}
            className=' resize-none rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an note'}
          />
        </label>
        <label className='label mb-6'>
          <span className='mb-2'>Category</span>
          <DropDown
            placeholder='Enter a category'
            options={options ?? []}
            value={dropdownValue}
            onChange={setDropdownValue}
          />
        </label>
      </div>
      <div className='flex space-x-6'>
        <button
          type='button'
          className='rounded-xl px-6 py-4 font-medium transition hover:bg-danger hover:text-white'
        >
          Cancel
        </button>
        <button
          onClick={addNewItem}
          className='rounded-xl bg-primary px-6 py-4 font-medium text-white transition hover:bg-primary/80'
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddItemForm;
