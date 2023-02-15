import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { queryClient } from '../App';
import useSidebar from '../hooks/userSidebar';
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
  const { user, userRefFirebase } = useUser();

  return useMutation({
    mutationFn: async ({
      item,
      categoryId,
      categoryName,
    }: {
      item: { name: string; desc: string };
      categoryId?: string;
      categoryName?: string;
    }) => {
      if (!categoryId && !categoryName) {
        return;
      }

      console.log(categoryId, categoryName);

      if (!categoryId && categoryName) {
        console.log('adding');
        await addDoc(collection(db, 'categories'), {
          name: categoryName,
          items: [item],
          user_ref: userRefFirebase,
        });
        return;
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
    onSettled: async () => {
      console.log('setteled');
      await queryClient.invalidateQueries({
        queryKey: ['categories', user?.uid],
      });
    },
  });
}

function AddItemForm() {
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const { setSidebarOption } = useSidebar();

  const nameRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const { data: options } = useDropdownOptions();
  const { mutateAsync: addItem, isLoading, error } = useAddItem();

  const addNewItem = async (e: React.FormEvent) => {
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

    await addItem({
      item,
      categoryId,
      categoryName: dropdownValue.trim() === '' ? undefined : dropdownValue,
    });
    nameRef.current.value = '';
    noteRef.current.value = '';
    setDropdownValue('');
    setSidebarOption('cart');
  };

  return (
    <form
      onSubmit={addNewItem}
      className='flex h-full w-full flex-col items-center justify-between py-8 px-6 xl:px-8'
    >
      <div className='flex w-full flex-col'>
        <h1 className='mb-10 text-2xl font-medium'>Add a new item</h1>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Name</span>
          <input
            ref={nameRef}
            type='text'
            className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an name'}
            disabled={isLoading}
          />
        </label>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Note (optional)</span>
          <textarea
            ref={noteRef}
            rows={3}
            className=' resize-none rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an note'}
            disabled={isLoading}
          />
        </label>
        <label className='label mb-2'>Category</label>

        <DropDown
          placeholder='Enter a category'
          options={options ?? []}
          value={dropdownValue}
          onChange={setDropdownValue}
          disabled={isLoading}
        />
      </div>
      <div className='flex space-x-6'>
        <button
          type='button'
          className='rounded-xl px-6 py-4 font-medium transition hover:bg-danger hover:text-white'
          onClick={() => {
            setSidebarOption('cart');
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          className={`${
            isLoading ? 'bg-primary/80' : 'bg-primary'
          } rounded-xl px-6 py-4 font-medium text-white transition hover:bg-primary/80`}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
