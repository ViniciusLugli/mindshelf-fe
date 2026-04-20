"use client";

import RichTextEditor from "@/app/(private)/tasks/components/RichTextEditor";
import TaskDeleteModal from "@/app/(private)/tasks/components/TaskDeleteModal";
import TaskSettingsModal from "@/app/(private)/tasks/components/TaskSettingsModal";
import TaskWorkspaceHeader from "@/app/(private)/tasks/components/TaskWorkspaceHeader";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTaskWorkspaceQuery,
  useUpdateTaskMutation,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTaskWorkspaceActions } from "../hooks/useTaskWorkspaceActions";
import { useTaskWorkspaceDraft } from "../hooks/useTaskWorkspaceDraft";

export default function TaskWorkspace({ taskId }: { taskId: string }) {
  const router = useRouter();
  const taskWorkspaceQuery = useTaskWorkspaceQuery(taskId);
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const task = taskWorkspaceQuery.data?.task ?? null;
  const groups = taskWorkspaceQuery.data?.groups ?? [];
  const isLoading = taskWorkspaceQuery.isLoading;
  const isSaving =
    createTaskMutation.isPending ||
    updateTaskMutation.isPending ||
    deleteTaskMutation.isPending;
  const {
    title,
    notes,
    selectedGroupId,
    hasChanges,
    setTitleDraft,
    setNotesDraft,
    setSelectedGroupIdDraft,
    resetDrafts,
  } = useTaskWorkspaceDraft({ task, groups });
  const { handleSave, handleDelete } = useTaskWorkspaceActions({
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
    onSaveSuccess: resetDrafts,
  });

  if (isLoading) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-4xl border border-base-300/70 bg-base-100/95 px-6 py-20 text-center text-sm text-base-content/45 shadow-sm">
          Loading note...
        </div>
      </section>
    );
  }

  if (!task) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-4xl border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          {feedback ??
            (taskWorkspaceQuery.error instanceof Error
              ? taskWorkspaceQuery.error.message
              : "Note not found.")}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 px-5 py-6">
      <TaskWorkspaceHeader
        task={task}
        title={title}
        isSaving={isSaving}
        hasChanges={hasChanges}
        onTitleChange={setTitleDraft}
        onOpenSettings={() => setConfigOpen(true)}
        onOpenDelete={() => setDeleteOpen(true)}
        onSave={() => void handleSave()}
      />

      {feedback ? (
        <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-base-content/75">
          {feedback}
        </div>
      ) : null}

      <RichTextEditor
        value={notes}
        onChange={setNotesDraft}
        placeholder="Write with headings, lists, highlights, and links."
      />

      <TaskSettingsModal
        open={configOpen}
        title={title}
        selectedGroupId={selectedGroupId}
        groups={groups}
        isSaving={isSaving}
        onTitleChange={setTitleDraft}
        onGroupChange={setSelectedGroupIdDraft}
        onClose={() => setConfigOpen(false)}
        onSave={() => void handleSave()}
      />

      <TaskDeleteModal
        open={deleteOpen}
        taskTitle={task.title}
        isSaving={isSaving}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => void handleDelete()}
      />
    </section>
  );
}
