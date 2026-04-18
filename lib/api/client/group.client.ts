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
  getPaginated(
    page: number,
    limit: number,
    name?: string,
  ): Promise<PaginatedGroupResponse> {
    return httpGet<PaginatedGroupResponse>(
      "/api/groups",
      {
        params: {
          ...withRequiredPagination({ page, limit }).params,
          ...(name ? { name } : {}),
        },
      },
    );
  },

  create(payload: CreateGroupRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, CreateGroupRequest>(
      "/api/groups",
      payload,
    );
  },

  delete(id: string): Promise<void> {
    return httpDelete<void>(`/api/groups/${toPathSegment(id)}`);
  },

  getById(id: string): Promise<GroupResponse> {
    return httpGet<GroupResponse>(`/api/groups/${toPathSegment(id)}`);
  },

  getByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginatedGroupResponse> {
    return groupApi.getPaginated(page, limit, name);
  },

  update(payload: UpdateGroupRequest): Promise<SimpleMessageResponse> {
    return httpPatch<SimpleMessageResponse, UpdateGroupRequest>(
      `/api/groups/${toPathSegment(payload.id)}`,
      payload,
    );
  },
};
