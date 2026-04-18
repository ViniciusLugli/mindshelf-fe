import ChatMessage from "@/app/(private)/chat/components/ChatMessage";
import type { MessageResponse } from "@/lib/api";

type MessageListProps = {
  messages: MessageResponse[];
  currentUserId?: string;
  friendName: string;
};

export default function MessageList({
  messages,
  currentUserId,
  friendName,
}: MessageListProps) {
  return (
    <div className="flex-1 space-y-4 bg-base-200/30 px-5 py-5">
      {messages.length ? (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            isMine={message.sender_id === currentUserId}
            message={message}
          />
        ))
      ) : (
        <div className="flex h-full min-h-64 items-center justify-center rounded-[1.5rem] border border-dashed border-base-300/70 bg-base-100/50 text-sm text-base-content/45">
          Comece a conversa com {friendName}.
        </div>
      )}
    </div>
  );
}
