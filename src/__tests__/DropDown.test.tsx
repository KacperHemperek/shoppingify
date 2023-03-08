import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { it, expect } from 'vitest';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DropDown, { DropdownOptionType } from '../components/DropDown';

const mockOptions: DropdownOptionType[] = [
  { id: '1', value: 'test1' },
  { id: '2', value: 'test2' },
  { id: '3', value: 'test3' },
];

describe('Dropdown tests', () => {
  it('should be empty and dropdown should be closed', async () => {
    render(
      <DropDown
        inputName='test'
        options={mockOptions}
        setValue={() => {}}
        value='does not contain that option'
        placeholder='placeholder'
      />
    );
    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');
    inputElement.focus();
    waitFor(() => expect(dropdownElement).not.toBeVisible());
    inputElement.blur();
    waitFor(() => expect(dropdownElement).not.toBeVisible());
  });

  it('should display dropdown when filtered array length is not 0', async () => {
    render(
      <DropDown
        inputName='test'
        options={mockOptions}
        setValue={() => {}}
        value='test2'
        placeholder='placeholder'
      />
    );

    const inputElement = screen.getByTestId('dropdown-input');
    const dropdownElement = screen.getByTestId('dropdown-list');

    inputElement.focus();

    waitFor(() => expect(dropdownElement).toBeVisible());
  });
});
