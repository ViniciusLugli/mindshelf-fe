import { httpDelete, httpGet, httpPatch, httpPost } from "../http";
import type {
  CreateGroupRequest,
  GroupResponse,
  PaginatedGroupResponse,
  SimpleMessageResponse,
  UpdateGroupRequest,
} from "../types";
import { toPathSegment, withRequiredPagination } from "./shared.client";

export const groupApi = {
  getPaginated(page: number, limit: number): Promise<PaginatedGroupResponse> {
    return httpGet<PaginatedGroupResponse>(
      "/api/group/",
      withRequiredPagination({ page, limit }),
    );
  },

  create(payload: CreateGroupRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, CreateGroupRequest>(
      "/api/group/create",
      payload,
    );
  },

  delete(id: string): Promise<void> {
    return httpDelete<void>("/api/group/delete", undefined, {
      params: { id },
    });
  },

  getById(id: string): Promise<GroupResponse> {
    return httpGet<GroupResponse>(`/api/group/id/${toPathSegment(id)}`);
  },

  getByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginatedGroupResponse> {
    return httpGet<PaginatedGroupResponse>(
      `/api/group/name/${toPathSegment(name)}`,
      withRequiredPagination({ page, limit }),
    );
  },

  update(payload: UpdateGroupRequest): Promise<SimpleMessageResponse> {
    return httpPatch<SimpleMessageResponse, UpdateGroupRequest>(
      "/api/group/update",
      payload,
    );
  },
};
