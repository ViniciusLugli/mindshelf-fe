import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import ConversationHeader from "./ConversationHeader";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import type { MessageResponse, UserResponse } from "@/lib/api";

type ConversationPanelProps = {
  friend: UserResponse | null;
  entry: ConversationEntry | null;
  messages: MessageResponse[];
  currentUserId?: string;
  draft: string;
  feedback: string | null;
  isSubmitting: boolean;
  isShareSubmitting: boolean;
  onDraftChange: (value: string) => void;
  onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  onOpenShareModal: () => void;
  onSharedTaskClick: (message: MessageResponse) => void;
};

export default function ConversationPanel({
  friend,
  entry,
  messages,
  currentUserId,
  draft,
  feedback,
  isSubmitting,
  isShareSubmitting,
  onDraftChange,
  onSendMessage,
  onOpenShareModal,
  onSharedTaskClick,
}: ConversationPanelProps) {
  if (!friend) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center px-6 text-center">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            No conversation selected
          </p>
          <h2 className="text-3xl font-semibold text-base-content">
            Pick someone to open the chat.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <ConversationHeader friend={friend} messageCount={messages.length} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          friendName={friend.name}
          onSharedTaskClick={onSharedTaskClick}
        />
        <MessageComposer
          draft={draft}
          friendName={friend.name}
          unreadCount={entry?.unreadCount ?? 0}
          lastMessageAt={messages.at(-1)?.created_at}
          feedback={feedback}
          isSubmitting={isSubmitting}
          isShareSubmitting={isShareSubmitting}
          onDraftChange={onDraftChange}
          onSubmit={onSendMessage}
          onOpenShareModal={onOpenShareModal}
        />
      </div>
    </div>
  );
}
