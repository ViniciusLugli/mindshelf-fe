"use client";

import ChatWorkspaceHeader from "@/app/(private)/chat/components/ChatWorkspaceHeader";
import ConversationList from "@/app/(private)/chat/components/ConversationList";
import ConversationPanel from "@/app/(private)/chat/components/ConversationPanel";
import ShareTaskModal from "@/app/(private)/chat/components/ShareTaskModal";
import { useConversationLifecycle } from "@/app/(private)/chat/hooks/useConversationLifecycle";
import { useSelectedConversation } from "@/app/(private)/chat/hooks/useSelectedConversation";
import { useShareableTasks } from "@/app/(private)/chat/hooks/useShareableTasks";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useState } from "react";
import { useConversationEntries } from "../hooks/useConversationEntries";

export default function ChatWorkspace({
  initialFriendId,
}: {
  initialFriendId?: string | null;
}) {
  const { currentUser } = useSession();
  const {
    chats,
    friends,
    messagesByUserId,
    connectionStatus,
    setActiveConversationId,
    refreshConversation,
    markMessagesRead,
    sendMessage,
    shareTask,
  } = useRealtime();

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [sharingOpen, setSharingOpen] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { shareableTasks, isLoadingTasks } = useShareableTasks(
    taskSearch,
    sharingOpen,
  );
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

  useConversationLifecycle({
    selectedFriendId,
    messages,
    setActiveConversationId,
    refreshConversation,
    markMessagesRead,
  });

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
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar a mensagem.",
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
        error instanceof Error
          ? error.message
          : "Nao foi possivel compartilhar a task.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6 px-5 py-6">
      <ChatWorkspaceHeader connectionStatus={connectionStatus} />

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <ConversationList
          search={search}
          onSearchChange={setSearch}
          entries={filteredEntries}
          selectedFriendId={selectedFriendId}
        />

        <div className="rounded-4xl border border-base-300/70 bg-base-100/95 shadow-sm">
          <ConversationPanel
            friend={selectedFriend}
            entry={selectedEntry}
            messages={messages}
            currentUserId={currentUser?.id}
            draft={draft}
            feedback={feedback}
            isSubmitting={isSubmitting}
            onDraftChange={setDraft}
            onSendMessage={handleSendMessage}
            onOpenShareModal={() => setSharingOpen(true)}
          />
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
    </section>
  );
}
