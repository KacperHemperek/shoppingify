import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOnClickOutside } from '../hooks/useClicedOutside';

type DropdownType = {
  id: string;
  value: string;
};
//TODO: dont move cursor when clicking arrows and focused on input
function DropDown({
  options,
  value,
  onChange,
}: {
  options: DropdownType[];
  onChange: React.Dispatch<SetStateAction<string>>;
  value?: string;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([inputRef, dropdownRef], () => {
    setCurrentlyChosen(null);
    setShowDropdown(false);
  });

  const filteredOptions = useMemo<DropdownType[]>(() => {
    if (!value) {
      return options.slice(0, 4);
    }
    const regex = new RegExp(value, 'gi');
    return options.filter((option) => option.value.match(regex)).slice(0, 4);
  }, [value]);
  const [currentlyChosen, setCurrentlyChosen] = useState<string | null>(null);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'ArrowUp') {
      if (!currentlyChosen) {
        console.log({ filteredOptions });
        setCurrentlyChosen(filteredOptions[filteredOptions.length - 1].id);
        return;
      }

      let index: number = -1;
      for (const [idx, option] of filteredOptions.entries()) {
        if (option.id === currentlyChosen) {
          index = idx;
          break;
        }
      }
      const prevIndex = index === 0 ? filteredOptions.length - 1 : --index;
      setCurrentlyChosen(filteredOptions[prevIndex].id);
    }
    if (event.code === 'ArrowDown') {
      if (!currentlyChosen) {
        console.log({ filteredOptions });
        setCurrentlyChosen(filteredOptions[0].id);
        return;
      }

      let index: number = -1;
      for (const [idx, option] of filteredOptions.entries()) {
        if (option.id === currentlyChosen) {
          index = idx;
          break;
        }
      }
      const nextIndex = index === filteredOptions.length - 1 ? 0 : ++index;
      setCurrentlyChosen(filteredOptions[nextIndex].id);
    }

    if (event.code === 'Enter') {
      onChange(
        (prev) =>
          options.find((option) => option.id === currentlyChosen)?.value ?? prev
      );
      setCurrentlyChosen(null);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const preventArrowEventsOnInput = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
      e.preventDefault();
    } else {
      setCurrentlyChosen(null);
    }
  };

  useEffect(() => {
    if (dropdownRef.current?.hidden) {
      return () => {
        inputRef.current?.removeEventListener(
          'keydown',
          preventArrowEventsOnInput
        );
        inputRef.current?.removeEventListener(
          'keyup',
          preventArrowEventsOnInput
        );
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
    inputRef.current?.removeEventListener('keydown', preventArrowEventsOnInput);
    inputRef.current?.addEventListener('keyup', preventArrowEventsOnInput);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      inputRef.current?.removeEventListener('keyup', preventArrowEventsOnInput);
    };
  }, [currentlyChosen, dropdownRef.current?.hidden, filteredOptions]);
  return (
    <div className='relative flex w-full flex-col '>
      <input
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        value={value}
        type='text'
        className='input'
        onFocus={() => setShowDropdown(true)}
      />
      {filteredOptions.length ? (
        <div
          className='absolute top-full w-full translate-y-3 rounded-xl bg-white p-2 shadow-lg '
          ref={dropdownRef}
          hidden={!showDropdown}
        >
          {filteredOptions.map((option) => (
            <div
              key={option.value + option.id}
              className={`rounded-lg p-4 transition ${
                option.id === currentlyChosen
                  ? 'bg-slate-100 font-medium'
                  : 'text-neutral'
              }`}
              onClick={() => {
                onChange(option.value);
                setShowDropdown(false);
              }}
              onMouseEnter={() => setCurrentlyChosen(option.id)}
            >
              {option.value}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
