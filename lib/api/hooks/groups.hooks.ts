"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isUuidLike } from "@/lib/utils/route-params";
import { groupApi, taskApi } from "../client";
import { queryKeys } from "../query-keys";
import type { CreateGroupRequest, UpdateGroupRequest } from "../types";

export function useGroupsQuery(
  search: string,
  page: number,
  limit: number,
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.groups.list(search, page, limit),
    queryFn: () =>
      search.trim()
        ? groupApi.getByName(search.trim(), page, limit)
        : groupApi.getPaginated(page, limit),
    enabled,
  });
}

export function useGroupWorkspaceQuery(groupId: string) {
  return useQuery({
    queryKey: queryKeys.groups.workspace(groupId),
    queryFn: async () => {
      const [group, tasks] = await Promise.all([
        groupApi.getById(groupId),
        taskApi.getPaginated(1, 50, { groupId }),
      ]);

      return {
        group,
        tasks: tasks.data,
      };
    },
    enabled: isUuidLike(groupId),
  });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGroupRequest) => groupApi.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.home.activity,
      });
    },
  });
}

export function useUpdateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateGroupRequest) => groupApi.update(payload),
    onSuccess: async (_response, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.home.activity,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groups.workspace(variables.id),
      });
    },
  });
}

export function useDeleteGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => groupApi.delete(groupId),
    onSuccess: async (_response, groupId) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.groups.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.home.activity,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groups.workspace(groupId),
      });
    },
  });
}
