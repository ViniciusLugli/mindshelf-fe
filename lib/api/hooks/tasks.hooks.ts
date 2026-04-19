"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isUuidLike } from "@/lib/utils/route-params";
import { groupApi, taskApi } from "../client";
import { queryKeys } from "../query-keys";
import type {
  CreateTaskRequest,
  DeleteTaskRequest,
  UpdateTaskRequest,
} from "../types";

export function useTasksQuery(
  search: string,
  page: number,
  limit: number,
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.tasks.list(search, page, limit),
    queryFn: () =>
      search.trim()
        ? taskApi.getPaginated(page, limit, { title: search.trim() })
        : taskApi.getPaginated(page, limit),
    enabled,
  });
}

export function useTaskWorkspaceQuery(taskId: string) {
  return useQuery({
    queryKey: queryKeys.tasks.workspace(taskId),
    queryFn: async () => {
      const [task, groups] = await Promise.all([
        taskApi.getById(taskId),
        groupApi.getPaginated(1, 50),
      ]);

      return {
        task,
        groups: groups.data,
      };
    },
    enabled: isUuidLike(taskId),
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskRequest) => taskApi.create(payload),
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.home.activity });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groups.workspace(variables.group_id),
      });
    },
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTaskRequest) => taskApi.update(payload),
    onSuccess: async (_response, variables) => {
      const cachedTaskWorkspace = queryClient.getQueryData<{
        task?: {
          group_id?: string;
        };
      }>(queryKeys.tasks.workspace(variables.id));
      const groupId = cachedTaskWorkspace?.task?.group_id;

      await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.home.activity });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.workspace(variables.id),
      });

      if (groupId) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.groups.workspace(groupId),
        });
      }
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteTaskRequest) => taskApi.delete(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.home.activity });
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
    },
  });
}
