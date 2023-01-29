import { SetStateAction, useMemo, useRef, useState } from 'react';

type DropdownType = {
  id: string | number;
  value: string;
};

function DropDown({
  options,
  value,
  onChange,
}: {
  options: DropdownType[];
  onChange: React.Dispatch<SetStateAction<string | undefined>>;
  value?: string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo<DropdownType[]>(() => {
    if (!value) {
      return options;
    }
    const regex = new RegExp(value, 'gi');
    return options.filter((option) => option.value.match(regex));
  }, [value]);

  return (
    <div className='relative flex w-full flex-col'>
      <input
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        value={value}
        type='text'
        className='input'
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
      />
      {showDropdown && (
        <div className='absolute top-full h-52 w-full  translate-y-3 border border-red-500'>
          {filteredOptions.map((option) => (
            <div
              key={option.value + option.id}
              className='hover:bg-slate-200'
              onClick={() => {
                onChange(option.value);
              }}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
