import { httpDelete, httpGet, httpPatch } from "../http";
import type {
  GetUserByIdOrEmailQuery,
  PaginatedUserResponse,
  SimpleMessageResponse,
  UpdateUserRequest,
  UserResponse,
} from "../types";
import { toPathSegment, withRequiredPagination } from "./shared.client";

export const userApi = {
  getByIdOrEmail(params: GetUserByIdOrEmailQuery): Promise<UserResponse> {
    return httpGet<UserResponse>("/api/user/", { params });
  },

  deleteAuthenticated(): Promise<void> {
    return httpDelete<void>("/api/user/delete");
  },

  updateAuthenticated(
    payload: UpdateUserRequest,
  ): Promise<SimpleMessageResponse> {
    return httpPatch<SimpleMessageResponse, UpdateUserRequest>(
      "/api/user/update",
      payload,
    );
  },

  getByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginatedUserResponse> {
    return httpGet<PaginatedUserResponse>(
      `/api/user/${toPathSegment(name)}`,
      withRequiredPagination({ page, limit }),
    );
  },
};
