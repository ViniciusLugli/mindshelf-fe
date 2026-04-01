import type { UserResponse } from "./user.types";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: UserResponse;
};
