"use client";

import CreateTaskModal from "@/app/(private)/groups/components/CreateTaskModal";
import DeleteGroupModal from "@/app/(private)/groups/components/DeleteGroupModal";
import EditGroupModal from "@/app/(private)/groups/components/EditGroupModal";
import GroupTaskList from "@/app/(private)/groups/components/GroupTaskList";
import GroupWorkspaceHeader from "@/app/(private)/groups/components/GroupWorkspaceHeader";
import GroupWorkspaceSidebar from "@/app/(private)/groups/components/GroupWorkspaceSidebar";
import {
  useCreateTaskMutation,
  useDeleteGroupMutation,
  useGroupWorkspaceQuery,
  useUpdateGroupMutation,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { normalizeHexColor } from "../utils/groupColor";
import { useGroupTaskFilter } from "../hooks/useGroupTaskFilter";

export default function GroupWorkspace({ groupId }: { groupId: string }) {
  const router = useRouter();
  const groupWorkspaceQuery = useGroupWorkspaceQuery(groupId);
  const createTaskMutation = useCreateTaskMutation();
  const updateGroupMutation = useUpdateGroupMutation();
  const deleteGroupMutation = useDeleteGroupMutation();
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [deleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [groupNameDraft, setGroupNameDraft] = useState<string | null>(null);
  const [groupColorDraft, setGroupColorDraft] = useState<string | null>(null);
  const group = groupWorkspaceQuery.data?.group ?? null;
  const tasks = groupWorkspaceQuery.data?.tasks;
  const isLoading = groupWorkspaceQuery.isLoading;
  const isSubmitting =
    createTaskMutation.isPending ||
    updateGroupMutation.isPending ||
    deleteGroupMutation.isPending;
  const taskList = useMemo(() => tasks ?? [], [tasks]);
  const groupName = groupNameDraft ?? group?.name ?? "";
  const groupColor = groupColorDraft ?? group?.color ?? "#E76F51";
  const filteredTasks = useGroupTaskFilter(taskList, search);

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskTitle.trim()) {
      return;
    }

    setFeedback(null);
    try {
      await createTaskMutation.mutateAsync({
        group_id: groupId,
        title: taskTitle.trim(),
      });
      setTaskTitle("");
      setTaskModalOpen(false);
      setFeedback("Note created successfully.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Could not create the note.",
      );
    }
  };

  const handleUpdateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedGroupColor = normalizeHexColor(groupColor);

    if (!group || !groupName.trim()) {
      return;
    }

    if (!normalizedGroupColor) {
      setFeedback("Choose a valid hex color for the group.");
      return;
    }

    setFeedback(null);
    try {
      await updateGroupMutation.mutateAsync({
        id: group.id,
        name: groupName.trim(),
        color: normalizedGroupColor,
      });
      setGroupNameDraft(groupName.trim());
      setGroupColorDraft(normalizedGroupColor);
      setGroupModalOpen(false);
      setFeedback("Group updated successfully.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Could not update the group.",
      );
    }
  };

  const handleDeleteGroup = async () => {
    if (!group) {
      return;
    }

    setFeedback(null);
    try {
      await deleteGroupMutation.mutateAsync(group.id);
      setDeleteGroupModalOpen(false);
      router.push("/groups");
      router.refresh();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Could not delete the group.",
      );
    }
  };

  if (isLoading) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-4xl border border-base-300/70 bg-base-100/95 px-6 py-20 text-center text-sm text-base-content/45 shadow-sm">
          Loading group...
        </div>
      </section>
    );
  }

  if (!group) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-4xl border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          {feedback ??
            (groupWorkspaceQuery.error instanceof Error
              ? groupWorkspaceQuery.error.message
              : "Group not found.")}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 px-5 py-6">
      <GroupWorkspaceHeader
        group={group}
        onDeleteGroup={() => setDeleteGroupModalOpen(true)}
        onConfigureGroup={() => {
          setGroupNameDraft(group.name);
          setGroupColorDraft(group.color);
          setGroupModalOpen(true);
        }}
        onCreateTask={() => setTaskModalOpen(true)}
      />

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <GroupWorkspaceSidebar taskCount={taskList.length} />
        <GroupTaskList
          search={search}
          onSearchChange={setSearch}
          feedback={feedback}
          tasks={filteredTasks}
        />
      </div>

      <CreateTaskModal
        open={taskModalOpen}
        groupName={group.name}
        taskTitle={taskTitle}
        isSubmitting={isSubmitting}
        onTaskTitleChange={setTaskTitle}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      <EditGroupModal
        open={groupModalOpen}
        groupName={groupName}
        groupColor={groupColor}
        isSubmitting={isSubmitting}
        onGroupNameChange={setGroupNameDraft}
        onGroupColorChange={setGroupColorDraft}
        onClose={() => setGroupModalOpen(false)}
        onSubmit={handleUpdateGroup}
      />

      <DeleteGroupModal
        open={deleteGroupModalOpen}
        groupName={group.name}
        isSaving={deleteGroupMutation.isPending}
        onClose={() => setDeleteGroupModalOpen(false)}
        onDelete={() => void handleDeleteGroup()}
      />
    </section>
  );
}
