import { XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { uuidv4 } from '@firebase/util';
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
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { queryClient } from '@/App';
import useSidebar from '@/hooks/useSidebar';
import { useUser } from '@/hooks/useUser';
import { db } from '@/lib/firebase';
import DropDown, { DropdownOptionType } from '@/components/DropDown';

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
      const itemWithId = { id: uuidv4(), ...item };

      if (!categoryId && !categoryName) {
        return;
      }

      if (!categoryId && categoryName) {
        try {
          await addDoc(collection(db, 'categories'), {
            name: categoryName,
            items: [itemWithId],
            user_ref: userRefFirebase,
          });
          return;
        } catch (err) {
          throw new Error("couldn't create a new category");
        }
      }

      const categoryRef = doc(collection(db, 'categories'), categoryId);
      try {
        await updateDoc(categoryRef, {
          items: arrayUnion(itemWithId),
        });
      } catch (e: any) {
        throw new Error('there was a problem adding item to db', { cause: e });
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['categories', user?.id],
      });
    },
  });
}

const AddItemSchema = z.object({
  name: z.string().min(1, 'Required'),
  desc: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
});

export type AddItemType = z.infer<typeof AddItemSchema>;

//FIXME: isValid not updating only on category change
function AddItemForm() {
  const { setSidebarOption } = useSidebar();

  const methods = useForm<AddItemType>({
    resolver: zodResolver(AddItemSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid },
    watch,
  } = methods;

  const watchCategory = watch('category');
  const { data: options } = useDropdownOptions();
  const { mutateAsync: addItem, isLoading, error } = useAddItem();

  const addNewItem = async (data: AddItemType) => {
    const item: { name: string; desc: string } = {
      name: data.name,
      desc: data.desc,
    };
    const categoryId = options?.find(
      (option) => option.value.toLowerCase() === data.category.toLowerCase()
    )?.id;

    await addItem({
      item,
      categoryId,
      categoryName:
        data.category.trim() === '' ? undefined : data.category.trim(),
    });

    reset();
    setSidebarOption('cart');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(addNewItem)}
        className='flex h-full w-full flex-col items-center justify-between py-8 px-6 xl:px-8'
      >
        <div className=' flex w-full flex-col'>
          <div className='mb-10 flex w-full items-center justify-between'>
            <h1 className=' text-2xl font-medium'>Add a new item</h1>
            <button
              type='button'
              onClick={() => setSidebarOption(undefined)}
              className='md:hidden'
            >
              <XMarkIcon className='h-6 w-6 text-black' />
            </button>
          </div>
          <label htmlFor='email' className='label mb-6'>
            <span className='mb-2'>Name</span>
            <input
              {...register('name')}
              type='text'
              className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
              placeholder={'Enter an name'}
              disabled={isLoading}
            />
          </label>
          <label htmlFor='email' className='label mb-6'>
            <span className='mb-2'>Note (optional)</span>
            <textarea
              {...register('desc')}
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
            setValue={setValue}
            inputName='category'
            value={watchCategory}
            disabled={isLoading}
            register={register('category')}
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
            className='submit-button px-6 py-4'
            disabled={!isValid}
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddItemForm;
