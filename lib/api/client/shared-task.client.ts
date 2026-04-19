import { httpPost } from "../http";
import type { ImportSharedTaskRequest, TaskResponse } from "../types";

export const sharedTaskApi = {
  importSharedTask(payload: ImportSharedTaskRequest): Promise<TaskResponse> {
    return httpPost<TaskResponse, ImportSharedTaskRequest>(
      "/api/shared-tasks/import",
      payload,
    );
  },
};
