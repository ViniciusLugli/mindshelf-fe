import { clearAuthTokenCookie, httpPost, setAuthTokenCookie } from "../http";
import type { AuthResponse, CreateUserRequest, LoginRequest } from "../types";

export const authApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const data = await httpPost<AuthResponse, LoginRequest>("/login", payload);

    if (data.token) {
      setAuthTokenCookie(data.token);
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
