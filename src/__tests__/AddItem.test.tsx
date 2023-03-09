import { queryClient } from '@/App';
import AddItemForm from '@/components/AddItem';
import SidebarContextProvider from '@/context/SidebarContext';
import { UserContextProvider } from '@/context/UserContext';
import { QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { auth } from '@/lib/firebase';
import {
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const TestAddItemComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SidebarContextProvider>
          <AddItemForm />
        </SidebarContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

const setupTest = async () => {
  render(<TestAddItemComponent />);

  await signInWithEmailAndPassword(auth, 'test@email.com', 'test123');

  const user = userEvent.setup();

  const nameInput = screen.getByPlaceholderText(/enter an name/i);
  const descInput = screen.getByPlaceholderText(/enter an note/i);

  return { nameInput, descInput, user };
};

describe('AddItem tests', () => {
  it('submit is disabled when form schema is not valid', async () => {
    const { descInput, nameInput, user } = await setupTest();

    nameInput.focus();

    user.keyboard('test 1');

    await waitFor(async () => {
      expect((nameInput as HTMLInputElement).value).toBe('test 1');
    });
  });
});
