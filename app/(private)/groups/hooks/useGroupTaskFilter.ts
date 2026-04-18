import type { TaskResponse } from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";
import { useMemo } from "react";

export function useGroupTaskFilter(tasks: TaskResponse[] | undefined, search: string) {
  return useMemo(() => {
    const taskList = tasks ?? [];
    const term = search.trim().toLowerCase();

    if (!term) {
      return taskList;
    }

    return taskList.filter((task) => {
      const notes = stripHtml(task.notes).toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.group_name.toLowerCase().includes(term) ||
        notes.includes(term)
      );
    });
  }, [search, tasks]);
}
