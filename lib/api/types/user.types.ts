import type { PaginatedResponse } from "./common.types";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  onboarding_completed?: boolean;
};

export type PaginatedUserResponse = PaginatedResponse<UserResponse>;

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type UpdateUserRequest = {
  email?: string;
  name?: string;
  onboarding_completed?: boolean;
  password?: string;
};
