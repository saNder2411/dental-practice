import { createContext, useEffect, useContext, useState } from 'react';

let userState: null | Object;

interface UserState {
  user: null | Object;
  loading: boolean;
}

const User = createContext<UserState>({ user: null, loading: false });

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/me');
  userState = res.ok ? await res.json() : null;
  userState && await fetch('/api/access');
  return userState;
};

export const UserProvider = ({ value, children }: { value: UserState; children: JSX.Element | JSX.Element[] | [] }) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState !== undefined) return;

    let canceled = false;

    fetchUser().then((user) => {
      if (canceled) return;

      setUser({ user, loading: false });
    });

    return () => {
      canceled = true;
    };
  }, [userState]);

  return data;
};
