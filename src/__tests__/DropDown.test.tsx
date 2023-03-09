import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import DropDown, { DropdownOptionType } from '../components/DropDown';
import { useForm } from 'react-hook-form';

const mockOptions: DropdownOptionType[] = [
  { id: '1', value: 'test1' },
  { id: '2', value: 'test2' },
  { id: '3', value: 'test3' },
];

const TestWrapper = ({ value }: { value?: string }) => {
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
    await act(async () => {
      render(<TestWrapper value='not visible dropdown' />);
    });

    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');

    inputElement.focus();
    await waitFor(() => expect(dropdownElement).not.toBeVisible());
    inputElement.blur();
    await waitFor(() => expect(dropdownElement).not.toBeVisible());
  });

  it('should display dropdown with filtered values', async () => {
    render(<TestWrapper />);
    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');

    inputElement.focus();
    fireEvent.change(inputElement, { target: { value: 'test1' } });

    await waitFor(async () => {
      expect(dropdownElement).toBeVisible();
      expect((inputElement as HTMLInputElement).value).toBe('test1');

      const avalibleOption = screen.queryByText('test1');
      const notAvalibleOption = screen.queryByText('test2');

      expect(avalibleOption).toBeInTheDocument();
      expect(notAvalibleOption).toBeNull();
    });
  });
});
