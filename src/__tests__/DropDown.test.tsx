import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import DropDown, { DropdownOptionType } from '../components/DropDown';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';



const mockOptions: DropdownOptionType[] = [
  { id: '1', value: 'test1' },
  { id: '2', value: 'test2' },
  { id: '3', value: 'test3' },
];

const setupTest = () => {
  const user = userEvent.setup();

  render(<DropdownWithFormHook />);
  const inputElement = screen.getByTestId('dropdown-input');
  const dropdownElement = screen.getByTestId('dropdown-list');

  return { inputElement, dropdownElement, user };
};

const DropdownWithFormHook = ({ value }: { value?: string }) => {
  const { register, setValue, watch } = useForm<{ category: string }>({
    defaultValues: {
      category: value ?? '',
    },
  });

  return (
    <DropDown
      inputName='category'
      options={mockOptions}
      register={register('category')}
      setValue={setValue}
      value={value ?? watch('category')}
    />
  );
};

describe('Dropdown tests', () => {
  it('should be empty and dropdown should be closed', async () => {
    render(<DropdownWithFormHook value='not visible dropdown' />);

    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');

    inputElement.focus();
    await waitFor(() => expect(dropdownElement).not.toBeVisible());
    inputElement.blur();
    await waitFor(() => expect(dropdownElement).not.toBeVisible());
  });

  it('should display dropdown with filtered values', async () => {
    const { dropdownElement, inputElement, user } = setupTest();

    inputElement.focus();
    await waitFor(async () => {
      const avalibleOption = screen.queryByText('test1');
      const secondAvalibleOption = screen.queryByText('test2');

      expect(avalibleOption).toBeInTheDocument();
      expect(secondAvalibleOption).toBeInTheDocument();
    });

    user.keyboard('test1');

    await waitFor(async () => {
      expect(dropdownElement).toBeVisible();
      expect((inputElement as HTMLInputElement).value).toBe('test1');

      const avalibleOption = screen.queryByText('test1');
      const notAvalibleOption = screen.queryByText('test2');

      expect(avalibleOption).toBeInTheDocument();
      expect(notAvalibleOption).toBeNull();
    });
  });

  it('Set value of an input with arrows', async () => {
    const { dropdownElement, inputElement, user } = setupTest();

    inputElement.focus();

    user.keyboard('tes[ArrowDown][ArrowDown][Enter]');

    await waitFor(async () => {
      expect((inputElement as HTMLInputElement).value).toBe('test2');
      expect(dropdownElement).not.toBeVisible();
    });
  });
});
