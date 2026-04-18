import { httpDelete, httpGet, httpPatch } from "../http";
import type {
  PaginatedUserResponse,
  SimpleMessageResponse,
  UpdateUserRequest,
  UserResponse,
} from "../types";
import { toPathSegment, withRequiredPagination } from "./shared.client";

export const userApi = {
  getAuthenticated(): Promise<UserResponse> {
    return httpGet<UserResponse>("/api/users/me");
  },

  getById(id: string): Promise<UserResponse> {
    return httpGet<UserResponse>(`/api/users/${toPathSegment(id)}`);
  },

  deleteAuthenticated(): Promise<void> {
    return httpDelete<void>("/api/users/me");
  },

  updateAuthenticated(
    payload: UpdateUserRequest,
  ): Promise<SimpleMessageResponse> {
    return httpPatch<SimpleMessageResponse, UpdateUserRequest>(
      "/api/users/me",
      payload,
    );
  },

  getByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginatedUserResponse> {
    return httpGet<PaginatedUserResponse>(
      "/api/users",
      {
        params: {
          ...withRequiredPagination({ page, limit }).params,
          name,
        },
      },
    );
  },
};
