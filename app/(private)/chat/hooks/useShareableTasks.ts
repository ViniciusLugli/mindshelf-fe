import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { useTasksQuery } from "@/lib/api";

export function useShareableTasks(taskSearch: string, enabled: boolean) {
  const debouncedTaskSearch = useDebouncedValue(taskSearch, 250);
  const shareTasksQuery = useTasksQuery(debouncedTaskSearch, 1, 20, enabled);

  return {
    shareableTasks: shareTasksQuery.data?.data ?? [],
    isLoadingTasks: shareTasksQuery.isLoading,
  };
}
