import { httpDelete, httpGet, httpPatch, httpPost } from "../http";
import type {
  CreateTaskRequest,
  DeleteTaskRequest,
  PaginatedTaskResponse,
  SimpleMessageResponse,
  TaskResponse,
  UpdateTaskRequest,
} from "../types";
import {
  toPathSegment,
  withOptionalPagination,
  withRequiredPagination,
} from "./shared.client";

export const taskApi = {
  getById(id: string): Promise<TaskResponse> {
    return httpGet<TaskResponse>("/api/task/", {
      params: { id },
    });
  },

  getPaginated(page?: number, limit?: number): Promise<PaginatedTaskResponse> {
    return httpGet<PaginatedTaskResponse>(
      "/api/task/all",
      withOptionalPagination({ page, limit }),
    );
  },

  create(payload: CreateTaskRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, CreateTaskRequest>(
      "/api/task/create",
      payload,
    );
  },

  delete(payload: DeleteTaskRequest): Promise<void> {
    return httpDelete<void, DeleteTaskRequest>("/api/task/delete", payload);
  },

  update(payload: UpdateTaskRequest): Promise<SimpleMessageResponse> {
    return httpPatch<SimpleMessageResponse, UpdateTaskRequest>(
      "/api/task/update",
      payload,
    );
  },

  getByTitle(
    title: string,
    page: number,
    limit: number,
  ): Promise<PaginatedTaskResponse> {
    return httpGet<PaginatedTaskResponse>(
      `/api/task/${toPathSegment(title)}`,
      withRequiredPagination({ page, limit }),
    );
  },
};
