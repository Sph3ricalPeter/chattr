import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CredentialsDto = {
  username: string;
  password: string;
}

export type AuthDto = {
  userId: number;
  username: string;
  accessToken: string;
}

interface AuthCtxInterface {
  user: AuthDto | null;
  setState?: () => void;
  signIn: (user: AuthDto) => void;
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
  const [state, setState] = usePersistedAuth({ userId: 0, username: "", accessToken: "" });

  const contextValue = useMemo(() => {
    const user = state as AuthDto;
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
  user: AuthDto | null;
  setState: (user: AuthDto | null) => void;
}): AuthCtxInterface {
  return {
    user,
    signIn: (user) => {
      setState(user)
    },
    signOut: () => {
      setState({ userId: 0, username: "", accessToken: "" });
    },
    isSignedIn: () => {
      return user?.accessToken !== "";
    },
  };
}

function usePersistedAuth(defaultState: AuthDto | null) {
  const [state, setStateRaw] = useState(() => getStorageState(defaultState));

  const setState = useCallback((newState: AuthDto | null) => {
    setStateRaw(newState);
    setStorageState(newState);
  }, []);

  return [state, setState];
}

function getStorageState(defaultState: AuthDto | null) {
  if (!window.localStorage) {
    return defaultState;
  }

  const rawData = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!rawData) {
    return defaultState;
  }

  try {
    const user = JSON.parse(rawData);

    if (user && user.userId && user.username && user.accessToken) {
      return user;
    }
  } catch (err) {
    console.error(err);
  }

  return defaultState;
}

function setStorageState(newState: AuthDto | null): void {
  if (!window.localStorage) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
}
