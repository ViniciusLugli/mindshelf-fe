import { clearAuthTokenCookie, httpPost, setAuthTokenCookie } from "../http";
import type { AuthResponse, CreateUserRequest, LoginRequest } from "../types";

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

    if (data.token) {
      setAuthTokenCookie(data.token, {
        persistent: options?.staySignedIn ?? false,
        days: options?.rememberDays ?? 30,
      });
    }

    return data;
  },

  async register(payload: CreateUserRequest): Promise<AuthResponse> {
    const data = await httpPost<AuthResponse, CreateUserRequest>(
      "/register",
      payload,
    );

    if (data.token) {
      setAuthTokenCookie(data.token);
    }

    return data;
  },

  logout() {
    clearAuthTokenCookie();
  },
};
