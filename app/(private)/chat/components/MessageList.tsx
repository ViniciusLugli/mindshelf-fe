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
    <div className="app-surface-3 flex-1 min-h-0 overflow-y-auto px-2 py-2 sm:px-5 sm:py-5">
      {messages.length ? (
        <div className="space-y-3 sm:space-y-4">
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
        <div className="app-empty-state flex h-full min-h-56 items-center justify-center rounded-[1.4rem] border border-dashed px-4 text-center text-sm sm:min-h-64 sm:rounded-3xl">
          Start the conversation with {friendName}.
        </div>
      )}
    </div>
  );
}
