import { useState } from 'react';
import DropDown from './DropDown';

function AddItem() {
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const mockOptions = [
    { id: '1', value: 'First Item' },
    { id: '2', value: 'Second Item' },
    { id: '3', value: 'Third Item' },
    { id: '4', value: 'Forth Item' },
  ];

  return (
    <div className='flex h-full flex-col items-center justify-between p-8'>
      <div className='flex w-full flex-col'>
        <h1 className='mb-10 text-2xl font-medium'>Add a new item</h1>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Name</span>
          <input
            type='text'
            className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an name'}
          />
        </label>
        <label htmlFor='email' className='label mb-6'>
          <span className='mb-2'>Note</span>
          <textarea
            rows={3}
            className=' resize-none rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
            placeholder={'Enter an note'}
          />
        </label>
        <label className='label mb-6'>
          <span className='mb-2'>Category</span>
          <DropDown
            placeholder='Enter a category'
            options={mockOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
          />
        </label>
      </div>
      <div className='flex space-x-6'>
        <button className='rounded-xl px-6 py-4 font-medium '>Cancel</button>
        <button className='rounded-xl bg-primary px-6 py-4 font-medium text-white transition hover:bg-primary/80'>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddItem;
