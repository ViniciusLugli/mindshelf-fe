"use client";

import ConversationList from "@/app/(private)/chat/components/ConversationList";
import ConversationPanel from "@/app/(private)/chat/components/ConversationPanel";
import ImportSharedTaskModal from "@/app/(private)/chat/components/ImportSharedTaskModal";
import ShareTaskModal from "@/app/(private)/chat/components/ShareTaskModal";
import { useConversationLifecycle } from "@/app/(private)/chat/hooks/useConversationLifecycle";
import { useSelectedConversation } from "@/app/(private)/chat/hooks/useSelectedConversation";
import { useShareableTasks } from "@/app/(private)/chat/hooks/useShareableTasks";
import {
  useRealtimeConversation,
  useRealtimeSocialCollections,
} from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { sharedTaskApi, useGroupsQuery } from "@/lib/api";
import type { MessageResponse } from "@/lib/api";
import { queryKeys } from "@/lib/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConversationEntries } from "../hooks/useConversationEntries";

export default function ChatWorkspace({
  initialFriendId,
}: {
  initialFriendId?: string | null;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentUser } = useSession();
  const { chats, friends } = useRealtimeSocialCollections();
  const {
    messagesByUserId,
    setActiveConversationId,
    refreshConversation,
    markMessagesRead,
    sendMessage,
    shareTask,
    setImportedSharedTask,
  } = useRealtimeConversation();

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [sharingOpen, setSharingOpen] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importMessage, setImportMessage] = useState<MessageResponse | null>(
    null,
  );
  const [selectedImportGroupId, setSelectedImportGroupId] = useState("");
  const [isImportingSharedTask, setIsImportingSharedTask] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const { shareableTasks, isLoadingTasks } = useShareableTasks(
    taskSearch,
    sharingOpen,
  );
  const importGroupsQuery = useGroupsQuery("", 1, 50, importModalOpen);
  const importGroups = importGroupsQuery.data?.data ?? [];
  const { conversationEntries, filteredEntries } = useConversationEntries({
    chats,
    friends,
    search,
  });
  const { selectedFriendId, selectedEntry, selectedFriend, messages } =
    useSelectedConversation({
      initialFriendId,
      conversationEntries,
      filteredEntries,
      messagesByUserId,
    });
  const hasSelectedConversation = Boolean(selectedFriendId);

  useConversationLifecycle({
    selectedFriendId,
    messages,
    setActiveConversationId,
    refreshConversation,
    markMessagesRead,
  });

  const handleCloseImportModal = () => {
    setImportModalOpen(false);
    setSelectedImportGroupId("");
    setImportError(null);
    setImportMessage(null);
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFriendId || !draft.trim()) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await sendMessage({
        to_user_id: selectedFriendId,
        content: draft.trim(),
      });
      setDraft("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not send your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareTask = async (taskId: string) => {
    if (!selectedFriendId) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await shareTask({ to_user_id: selectedFriendId, task_id: taskId });
      setSharingOpen(false);
      setTaskSearch("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not share the note.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSharedTaskClick = async (message: MessageResponse) => {
    const importedTaskId = message.shared_task?.imported_task_id;

    if (importedTaskId) {
      router.push(`/tasks/${importedTaskId}`);
      return;
    }

    if (!selectedFriendId || message.sender_id === currentUser?.id) {
      return;
    }

    setImportError(null);
    setSelectedImportGroupId("");
    setImportMessage(message);
    setImportModalOpen(true);
  };

  const handleImportSharedTask = async () => {
    if (!importMessage || !selectedFriendId || !selectedImportGroupId) {
      return;
    }

    setIsImportingSharedTask(true);
    setImportError(null);

    try {
      const importedTask = await sharedTaskApi.importSharedTask({
        message_id: importMessage.id,
        group_id: selectedImportGroupId,
      });

      setImportedSharedTask({
        friendId: selectedFriendId,
        messageId: importMessage.id,
        importedTaskId: importedTask.id,
      });

      await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.home.activity,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.groups.workspace(selectedImportGroupId),
      });

      handleCloseImportModal();
      router.push(`/tasks/${importedTask.id}`);
    } catch (error) {
      setImportError(
        error instanceof Error
          ? error.message
          : "Could not import the shared note.",
      );
    } finally {
      setIsImportingSharedTask(false);
    }
  };

  const openShareModal = (friend?: UserResponse | null) => {
    if (!friend) {
      setFeedback("Choose a conversation before sharing a note.");
      return;
    }

    setFeedback(null);
    setSharingOpen(true);
  };

  return (
    <section className="w-full px-2 py-2 sm:px-5 sm:py-6">
      <div className="grid h-[calc(100dvh-4.75rem)] min-h-[30rem] gap-3 lg:h-dvh lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
        <div className={`${hasSelectedConversation ? "hidden lg:block" : "block"} min-h-0`}>
          <ConversationList
            search={search}
            onSearchChange={setSearch}
            entries={filteredEntries}
            selectedFriendId={selectedFriendId}
          />
        </div>

        <div
          className={`${hasSelectedConversation ? "block" : "hidden lg:block"} min-h-0`}
        >
          <div className="app-surface-1 h-full overflow-hidden rounded-[1.35rem] border sm:rounded-4xl">
            <ConversationPanel
              friend={selectedFriend}
              entry={selectedEntry}
              messages={messages}
              currentUserId={currentUser?.id}
              draft={draft}
              feedback={feedback}
              isSubmitting={isSubmitting}
              isShareSubmitting={isSubmitting}
              onDraftChange={setDraft}
              onSendMessage={handleSendMessage}
              onOpenShareModal={() => openShareModal(selectedFriend)}
              onSharedTaskClick={handleSharedTaskClick}
            />
          </div>
        </div>
      </div>

      <ShareTaskModal
        open={sharingOpen}
        selectedFriendName={selectedFriend?.name}
        taskSearch={taskSearch}
        isLoadingTasks={isLoadingTasks}
        isSubmitting={isSubmitting}
        tasks={shareableTasks}
        onTaskSearchChange={setTaskSearch}
        onShareTask={handleShareTask}
        onClose={() => setSharingOpen(false)}
      />

      <ImportSharedTaskModal
        open={importModalOpen}
        message={importMessage}
        groups={importGroups}
        selectedGroupId={selectedImportGroupId}
        isLoadingGroups={importGroupsQuery.isLoading}
        isImporting={isImportingSharedTask}
        errorMessage={importError}
        onGroupChange={setSelectedImportGroupId}
        onClose={handleCloseImportModal}
        onConfirm={() => void handleImportSharedTask()}
      />
    </section>
  );
}
