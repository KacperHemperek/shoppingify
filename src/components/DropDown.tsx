import { useCombobox } from 'downshift';
import React, { SetStateAction, useMemo } from 'react';

export type DropdownOptionType = {
  id: string;
  value: string;
};
const DropDown = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  options: DropdownOptionType[];
  onChange: React.Dispatch<SetStateAction<string>>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const {
    getInputProps,
    isOpen,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange(e) {
      console.log(e);
      onChange(e?.inputValue ?? '');
    },
    items: options,
    itemToString(item) {
      return item?.value ?? '';
    },
  });

  const filteredOptions = useMemo<DropdownOptionType[]>(() => {
    if (!value) {
      return options;
    }

    return options.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, options]);

  return (
    <div className='relative flex w-full flex-col'>
      <input
        type='text'
        {...getInputProps()}
        className='input'
        placeholder={placeholder}
        disabled={disabled}
      />
      <ul
        {...getMenuProps()}
        className={`${
          !(isOpen && filteredOptions.length) && 'hidden'
        } absolute top-full max-h-[170px] w-full translate-y-3 overflow-y-auto rounded-xl bg-white p-2 shadow-lg`}
      >
        {filteredOptions.map((option, idx) => (
          <li
            className={`${
              highlightedIndex === idx
                ? 'bg-slate-100 text-black'
                : 'text-neutral'
            } rounded-lg p-4 font-medium transition`}
            key={option.id}
            {...getItemProps({ item: option, index: idx })}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
