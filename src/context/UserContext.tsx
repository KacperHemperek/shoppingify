import { User } from 'firebase/auth';
import { collection, doc, DocumentReference } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';

type UserContextType = {
  user: User | null;
  error: string | null;
  loading: boolean;
  userRefFirebase: null | DocumentReference;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  error: null,
  loading: false,
  userRefFirebase: null,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // const [userRefFirebase, setUserRefFirebase] =
  //   useState<DocumentReference | null>(null);
  const userRefFirebase = user ? doc(collection(db, 'users'), user?.uid) : null;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        // setUserRefFirebase(doc(collection(db, 'users'), user?.uid));
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
        userRefFirebase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
