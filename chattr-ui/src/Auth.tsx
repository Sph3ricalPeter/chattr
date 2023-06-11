import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type UserCredentials = {
  username: string;
  password: string;
}

export type UserInfo = {
  id: number;
  username: string;
  accessToken: string;
}

interface ContextInterface {
  user: UserInfo | null;
  setState?: () => void;
  signIn: (user: UserInfo) => void;
  signOut: () => void;
  isSignedIn: () => boolean;
}

const LOCAL_STORAGE_AUTH_KEY = "chattr-auth";

const AuthContext = createContext(
  createContextValue({
    user: null,
    setState: () =>
      console.error("You are using AuthContext without AuthProvider!"),
  })
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = usePersistedAuth({ id: 0, username: "", accessToken: "" });

  const contextValue = useMemo(() => {
    const user = state as UserInfo;
    return createContextValue({ user, setState });
  }, [state, setState]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function createContextValue({
  user,
  setState,
}: {
  user: UserInfo | null;
  setState: (user: UserInfo | null) => void;
}): ContextInterface {
  return {
    user,
    signIn: (user) => {
      console.log("setting user: ", user);
      setState(user)
    },
    signOut: () => {
      console.log("signing out");
      setState({ id: 0, username: "", accessToken: "" });
    },
    isSignedIn: () => {
      return user?.accessToken !== "";
    },
  };
}

function usePersistedAuth(defaultState: UserInfo | null) {
  const [state, setStateRaw] = useState(() => getStorageState(defaultState));

  const setState = useCallback((newState: UserInfo | null) => {
    setStateRaw(newState);
    setStorageState(newState);
  }, []);

  return [state, setState];
}

function getStorageState(defaultState: UserInfo | null) {
  if (!window.localStorage) {
    return defaultState;
  }

  const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!rawData) {
    return defaultState;
  }

  try {
    const user = JSON.parse(rawData);

    if (user && user.id && user.username && user.accessToken) {
      return user;
    }
  } catch (err) {
    console.error(err);
  }

  return defaultState;
}

function setStorageState(newState: UserInfo | null): void {
  if (!window.localStorage) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
}
