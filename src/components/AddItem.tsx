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
    <div className='flex '>
      <DropDown
        options={mockOptions}
        value={dropdownValue}
        onChange={setDropdownValue}
      />
    </div>
  );
}

export default AddItem;
