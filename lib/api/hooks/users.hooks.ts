"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../client";
import { queryKeys } from "../query-keys";
import type { UpdateUserRequest } from "../types";

export function useUserSearchQuery(search: string, page: number, limit: number) {
  return useQuery({
    queryKey: queryKeys.users.search(search, page, limit),
    queryFn: () => userApi.getByName(search.trim(), page, limit),
    enabled: Boolean(search.trim()),
  });
}

export function useUserProfileQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getByIdOrEmail({ id: userId }),
    enabled: Boolean(userId),
  });
}

export function useUpdateCurrentUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserRequest) => userApi.updateAuthenticated(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
