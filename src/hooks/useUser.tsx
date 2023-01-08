import { User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

type UserContextType = {
  user: User | null;
  error: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  error: null,
  loading: false,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
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
