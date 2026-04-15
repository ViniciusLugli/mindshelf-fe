import { clearAuthTokenCookie, httpPost, setAuthTokenCookie } from "../http";
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
    const data = await httpPost<AuthResponse, LoginRequest>("/login", payload);

    if (!data?.token || !data?.user) {
      throw new Error("Nao foi possivel entrar. Verifique suas credenciais.");
    }

    if (data.token) {
      setAuthTokenCookie(data.token, {
        persistent: options?.staySignedIn ?? false,
        days: options?.rememberDays ?? 30,
      });
    }

    if (data.user) {
      persistSessionUser(data.user);
    }

    return data;
  },

  async register(payload: CreateUserRequest): Promise<AuthResponse> {
    const data = await httpPost<AuthResponse, CreateUserRequest>(
      "/register",
      payload,
    );

    if (!data?.token || !data?.user) {
      throw new Error("Nao foi possivel criar sua conta. Tente novamente.");
    }

    if (data.token) {
      setAuthTokenCookie(data.token);
    }

    if (data.user) {
      persistSessionUser(data.user);
    }

    return data;
  },

  logout() {
    clearAuthTokenCookie();
    clearSessionUser();
  },
};
