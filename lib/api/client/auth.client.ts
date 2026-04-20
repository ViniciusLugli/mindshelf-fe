import {
  clearAuthTokenCookie,
  clearPersistentLoginCookie,
  httpPost,
  setAuthTokenCookie,
  setPersistentLoginCookie,
} from "../http";
import type { AuthResponse, CreateUserRequest, LoginRequest } from "../types";
import { clearSessionUser, persistSessionUser } from "@/lib/auth/session";

type LoginOptions = {
  staySignedIn?: boolean;
  rememberDays?: number;
};

export const authApi = {
  async login(
    payload: LoginRequest,
    options?: LoginOptions,
  ): Promise<AuthResponse> {
    const data = await httpPost<AuthResponse, LoginRequest>(
      "/api/auth/login",
      payload,
    );

    if (!data?.token || !data?.user) {
      throw new Error("Could not sign in. Check your credentials and try again.");
    }

    if (data.token) {
      setAuthTokenCookie(data.token, {
        persistent: options?.staySignedIn ?? false,
        days: options?.rememberDays ?? 30,
      });

      if (options?.staySignedIn) {
        setPersistentLoginCookie({ days: options?.rememberDays ?? 30 });
      } else {
        clearPersistentLoginCookie();
      }
    }

    if (data.user) {
      persistSessionUser(data.user);
    }

    return data;
  },

  async register(payload: CreateUserRequest): Promise<AuthResponse> {
    const data = await httpPost<AuthResponse, CreateUserRequest>(
      "/api/auth/register",
      payload,
    );

    if (!data?.token || !data?.user) {
      throw new Error("Could not create your account. Please try again.");
    }

    if (data.token) {
      setAuthTokenCookie(data.token, { persistent: false });
      clearPersistentLoginCookie();
    }

    if (data.user) {
      persistSessionUser(data.user);
    }

    return data;
  },

  logout() {
    clearAuthTokenCookie();
    clearPersistentLoginCookie();
    clearSessionUser();
  },
};
