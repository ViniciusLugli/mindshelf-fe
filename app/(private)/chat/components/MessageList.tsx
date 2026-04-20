import ChatMessage from "@/app/(private)/chat/components/ChatMessage";
import type { MessageResponse } from "@/lib/api";

type MessageListProps = {
  messages: MessageResponse[];
  currentUserId?: string;
  friendName: string;
  onSharedTaskClick: (message: MessageResponse) => void;
};

export default function MessageList({
  messages,
  currentUserId,
  friendName,
  onSharedTaskClick,
}: MessageListProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-base-200/30 px-5 py-5">
      {messages.length ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              isMine={message.sender_id === currentUserId}
              message={message}
              onSharedTaskClick={onSharedTaskClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full min-h-64 items-center justify-center rounded-3xl border border-dashed border-base-300/70 bg-base-100/50 text-sm text-base-content/45">
            Start the conversation with {friendName}.
        </div>
      )}
    </div>
  );
}
