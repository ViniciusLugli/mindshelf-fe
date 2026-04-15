"use client";

import { useQuery } from "@tanstack/react-query";
import { groupApi, taskApi } from "../client";
import { queryKeys } from "../query-keys";

export function useHomeActivityQuery() {
  return useQuery({
    queryKey: queryKeys.home.activity,
    queryFn: async () => {
      const [groups, tasks] = await Promise.all([
        groupApi.getPaginated(1, 4),
        taskApi.getPaginated(1, 4),
      ]);

      return {
        groups: groups.data,
        tasks: tasks.data,
      };
    },
  });
}
