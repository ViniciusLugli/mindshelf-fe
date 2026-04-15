import type { UserResponse } from "@/lib/api/types";

export const AUTH_USER_COOKIE_KEY = "mindshelf_user";
export const AUTH_USER_STORAGE_KEY = "mindshelf_user";

function isBrowser() {
  return typeof window !== "undefined";
}

export function deserializeSessionUser(value?: string | null): UserResponse | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(value)) as UserResponse;
  } catch {
    return null;
  }
}

export function getStoredSessionUser(): UserResponse | null {
  if (!isBrowser()) {
    return null;
  }

  const stored = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);
  return deserializeSessionUser(stored);
}

export function persistSessionUser(user: UserResponse) {
  if (!isBrowser()) {
    return;
  }

  const serialized = JSON.stringify(user);
  const encoded = encodeURIComponent(serialized);

  window.localStorage.setItem(AUTH_USER_STORAGE_KEY, serialized);
  document.cookie = `${AUTH_USER_COOKIE_KEY}=${encoded}; Path=/; SameSite=Lax`;
}

export function clearSessionUser() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  document.cookie = `${AUTH_USER_COOKIE_KEY}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
}
