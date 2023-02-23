import { useCombobox } from 'downshift';
import { useMemo } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export type DropdownOptionType = {
  id: string;
  value: string;
};
const DropDown = ({
  options,
  value,
  placeholder,
  disabled,
  setValue,
  inputName,
}: {
  options: DropdownOptionType[];
  inputName: string;
  setValue: UseFormSetValue<any>;
  value: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
  // const { setValue } = useFormContext<AddItemType>();

  const {
    getInputProps,
    isOpen,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange(e) {
      //FIXME: list doesn't update when value changes
      setValue(inputName, e.inputValue || '');
      console.log(e.inputValue);
      console.log(value);
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
