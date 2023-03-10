import { fetchFn } from '@/utils/fetchFunction';
import { useQuery } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';
import React from 'react';

export type User = {
  name: string;
  id: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  error: string | undefined | unknown;
  loading: boolean;
  userRefFirebase: null | DocumentReference;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  error: undefined,
  loading: false,
  userRefFirebase: null,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null>({
    queryFn: async () => {
      try {
        return (await fetchFn({ url: '/api/session' })).data;
      } catch (error: any) {
        return null;
      }
    },
    queryKey: ['user'],
  });

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        error,
        loading: isLoading,
        userRefFirebase: null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
