import type { GroupResponse, TaskResponse } from "@/lib/api";
import { useMemo, useState } from "react";

type UseTaskWorkspaceDraftParams = {
  task: TaskResponse | null;
  groups: GroupResponse[];
};

export function useTaskWorkspaceDraft({
  task,
  groups,
}: UseTaskWorkspaceDraftParams) {
  const [titleDraft, setTitleDraft] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string | null>(null);
  const [selectedGroupIdDraft, setSelectedGroupIdDraft] = useState<string | null>(null);

  const title = titleDraft ?? task?.title ?? "";
  const notes = notesDraft ?? task?.notes ?? "<p></p>";
  const selectedGroupId = selectedGroupIdDraft ?? task?.group_id ?? "";

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId],
  );

  const hasChanges = useMemo(() => {
    if (!task) {
      return false;
    }

    return (
      title.trim() !== task.title ||
      notes !== (task.notes || "<p></p>") ||
      selectedGroupId !== task.group_id
    );
  }, [notes, selectedGroupId, task, title]);

  const resetDrafts = () => {
    setTitleDraft(null);
    setNotesDraft(null);
    setSelectedGroupIdDraft(null);
  };

  const syncAfterSave = () => {
    if (!task) {
      return;
    }

    setTitleDraft(task.title);
    setNotesDraft(task.notes ?? "<p></p>");
    setSelectedGroupIdDraft(task.group_id);
  };

  return {
    title,
    notes,
    selectedGroupId,
    selectedGroup,
    hasChanges,
    setTitleDraft,
    setNotesDraft,
    setSelectedGroupIdDraft,
    resetDrafts,
    syncAfterSave,
  };
}
