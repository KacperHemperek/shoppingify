import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DropDown, { DropdownOptionType } from '../components/DropDown';

const mockOnChange = jest.fn();

describe('Testing DropDown element', () => {
  it('shold be empty and dropwodn should be closed', async () => {
    const mockOptions: DropdownOptionType[] = [{ id: '1', value: 'test' }];
    render(
      <DropDown
        inputName='test'
        options={mockOptions}
        setValue={mockOnChange}
        value='does not contain that option'
        placeholder='placeholder'
      />
    );
    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');
    inputElement.focus();

    expect(dropdownElement).not.toBeInTheDocument();
  });
});
