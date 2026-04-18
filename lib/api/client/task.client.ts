import { httpDelete, httpGet, httpPatch, httpPost } from "../http";
import type {
  CreateTaskRequest,
  DeleteTaskRequest,
  PaginatedTaskResponse,
  TaskResponse,
  UpdateTaskRequest,
} from "../types";
import { toPathSegment, withRequiredPagination } from "./shared.client";

export const taskApi = {
  getById(id: string): Promise<TaskResponse> {
    return httpGet<TaskResponse>(`/api/tasks/${toPathSegment(id)}`);
  },

  getPaginated(
    page: number,
    limit: number,
    filters?: {
      title?: string;
      groupId?: string;
    },
  ): Promise<PaginatedTaskResponse> {
    return httpGet<PaginatedTaskResponse>(
      "/api/tasks",
      {
        params: {
          ...withRequiredPagination({ page, limit }).params,
          ...(filters?.title ? { title: filters.title } : {}),
          ...(filters?.groupId ? { group_id: filters.groupId } : {}),
        },
      },
    );
  },

  getByGroup(
    groupId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedTaskResponse> {
    return taskApi.getPaginated(page, limit, { groupId });
  },

  create(payload: CreateTaskRequest): Promise<TaskResponse> {
    return httpPost<TaskResponse, CreateTaskRequest>(
      "/api/tasks",
      payload,
    );
  },

  delete(payload: DeleteTaskRequest): Promise<void> {
    return httpDelete<void>(`/api/tasks/${toPathSegment(payload.id)}`);
  },

  update(payload: UpdateTaskRequest): Promise<Record<string, string>> {
    return httpPatch<Record<string, string>, UpdateTaskRequest>(
      `/api/tasks/${toPathSegment(payload.id)}`,
      payload,
    );
  },

  getByTitle(
    title: string,
    page: number,
    limit: number,
  ): Promise<PaginatedTaskResponse> {
    return taskApi.getPaginated(page, limit, { title });
  },
};
