import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

type UserContextType = {
  user: User | null;
  error: string | null;
  loading: boolean;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  error: null,
  loading: false,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setLoading(true);
        setUser(user);
        setError(null);
        setLoading(false);
      },
      (error) => {
        setLoading(true);
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <UserContext.Provider
      value={{
        user,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
