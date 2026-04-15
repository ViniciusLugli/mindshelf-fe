"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupApi, taskApi } from "../client";
import { queryKeys } from "../query-keys";
import type { CreateGroupRequest, UpdateGroupRequest } from "../types";

export function useGroupsQuery(search: string, page: number, limit: number) {
  return useQuery({
    queryKey: queryKeys.groups.list(search, page, limit),
    queryFn: () =>
      search.trim()
        ? groupApi.getByName(search.trim(), page, limit)
        : groupApi.getPaginated(page, limit),
  });
}

export function useGroupWorkspaceQuery(groupId: string) {
  return useQuery({
    queryKey: queryKeys.groups.workspace(groupId),
    queryFn: async () => {
      const [group, tasks] = await Promise.all([
        groupApi.getById(groupId),
        taskApi.getByGroup(groupId, 1, 50),
      ]);

      return {
        group,
        tasks: tasks.data,
      };
    },
    enabled: Boolean(groupId),
  });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGroupRequest) => groupApi.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.home.activity });
    },
  });
}

export function useUpdateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateGroupRequest) => groupApi.update(payload),
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.home.activity });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groups.workspace(variables.id),
      });
    },
  });
}
