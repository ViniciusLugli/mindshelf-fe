"use client";

import type { UserResponse } from "@/lib/api/types";
import {
  clearSessionUser,
  getStoredSessionUser,
  persistSessionUser,
} from "@/lib/auth/session";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SessionContextValue = {
  currentUser: UserResponse | null;
  setCurrentUser: (user: UserResponse | null) => void;
  refreshSession: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

type SessionProviderProps = {
  children: React.ReactNode;
  initialUser?: UserResponse | null;
};

export function SessionProvider({
  children,
  initialUser = null,
}: SessionProviderProps) {
  const [currentUser, setCurrentUserState] = useState<UserResponse | null>(() => {
    return initialUser ?? getStoredSessionUser();
  });

  useEffect(() => {
    if (initialUser) {
      persistSessionUser(initialUser);
    }
  }, [initialUser]);

  const setCurrentUser = useCallback((user: UserResponse | null) => {
    setCurrentUserState(user);

    if (user) {
      persistSessionUser(user);
      return;
    }

    clearSessionUser();
  }, []);

  const refreshSession = useCallback(() => {
    setCurrentUserState(getStoredSessionUser());
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      currentUser,
      setCurrentUser,
      refreshSession,
    }),
    [currentUser, refreshSession, setCurrentUser],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return context;
}
