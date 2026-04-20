import type { TaskResponse } from "@/lib/api";

type TaskWorkspaceQuery = {
  refetch: () => Promise<unknown>;
};

type MutationLike<TVariables> = {
  mutateAsync: (variables: TVariables) => Promise<unknown>;
};

type UseTaskWorkspaceActionsParams = {
  task: TaskResponse | null;
  title: string;
  notes: string;
  selectedGroupId: string;
  router: {
    push: (href: string) => void;
    refresh: () => void;
  };
  taskWorkspaceQuery: TaskWorkspaceQuery;
  createTaskMutation: MutationLike<{ group_id: string; title: string; notes: string }>;
  updateTaskMutation: MutationLike<{ id: string; title: string; notes: string }>;
  deleteTaskMutation: MutationLike<{ id: string }>;
  setFeedback: (value: string | null) => void;
  onSaveSuccess: () => void;
};

export function useTaskWorkspaceActions({
  task,
  title,
  notes,
  selectedGroupId,
  router,
  taskWorkspaceQuery,
  createTaskMutation,
  updateTaskMutation,
  deleteTaskMutation,
  setFeedback,
  onSaveSuccess,
}: UseTaskWorkspaceActionsParams) {
  const handleSave = async () => {
    if (!task) {
      return;
    }

    setFeedback(null);

    try {
      if (selectedGroupId !== task.group_id) {
        await createTaskMutation.mutateAsync({
          group_id: selectedGroupId,
          title: title.trim(),
          notes,
        });
        await deleteTaskMutation.mutateAsync({ id: task.id });
        router.push(`/groups/${selectedGroupId}`);
        router.refresh();
        return;
      }

      await updateTaskMutation.mutateAsync({
        id: task.id,
        title: title.trim(),
        notes,
      });
      await taskWorkspaceQuery.refetch();
      onSaveSuccess();
      setFeedback("Note saved successfully.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not save the note.",
      );
    }
  };

  const handleDelete = async () => {
    if (!task) {
      return;
    }

    setFeedback(null);

    try {
      await deleteTaskMutation.mutateAsync({ id: task.id });
      router.push(`/groups/${task.group_id}`);
      router.refresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not delete the note.",
      );
    }
  };

  return {
    handleSave,
    handleDelete,
  };
}
