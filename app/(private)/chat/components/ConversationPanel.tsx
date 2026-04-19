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
  onDraftChange,
  onSendMessage,
  onOpenShareModal,
  onSharedTaskClick,
}: ConversationPanelProps) {
  if (!friend) {
    return (
      <div className="flex min-h-160 items-center justify-center px-6 text-center">
        <div className="max-w-md space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Nenhuma conversa selecionada
          </p>
          <h2 className="text-3xl font-semibold text-base-content">
            Escolha um amigo para abrir o chat.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConversationHeader
        friend={friend}
        messageCount={messages.length}
        onShareTask={onOpenShareModal}
      />

      <div className="flex min-h-135 flex-col">
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
          onDraftChange={onDraftChange}
          onSubmit={onSendMessage}
        />
      </div>
    </>
  );
}
