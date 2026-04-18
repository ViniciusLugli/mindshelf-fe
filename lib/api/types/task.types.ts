import type { PaginatedResponse } from "./common.types";

export type TaskResponse = {
  id: string;
  title: string;
  notes: string;
  group_id: string;
  group_name: string;
  group_color: string;
};

export type PaginatedTaskResponse = PaginatedResponse<TaskResponse>;

export type CreateTaskRequest = {
  group_id: string;
  title: string;
  notes?: string;
};

export type UpdateTaskRequest = {
  id: string;
  title?: string;
  notes?: string;
};

export type DeleteTaskRequest = {
  id: string;
};
