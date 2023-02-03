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
    <div className='flex flex-col p-8'>
      <label htmlFor='email' className='label mb-6'>
        <span className='mb-2'>Name</span>
        <input
          type='text'
          className=' rounded-xl border-2 border-neutral-light p-4 outline-2 outline-primary transition-all placeholder:text-sm placeholder:text-neutral-light focus:placeholder:text-primary'
          placeholder={'Enter an name'}
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
  );
}

export default AddItem;
