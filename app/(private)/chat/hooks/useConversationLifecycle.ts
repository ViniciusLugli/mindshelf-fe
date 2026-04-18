import type { MarkMessagesReadRequest, MessageResponse } from "@/lib/api";
import { useEffect } from "react";

type UseConversationLifecycleParams = {
  selectedFriendId: string | null;
  messages: MessageResponse[];
  setActiveConversationId: (friendId: string | null) => void;
  refreshConversation: (friendId: string) => Promise<MessageResponse[] | void>;
  markMessagesRead: (
    payload: MarkMessagesReadRequest,
  ) => Promise<unknown>;
};

export function useConversationLifecycle({
  selectedFriendId,
  messages,
  setActiveConversationId,
  refreshConversation,
  markMessagesRead,
}: UseConversationLifecycleParams) {
  useEffect(() => {
    setActiveConversationId(selectedFriendId);

    if (selectedFriendId) {
      void refreshConversation(selectedFriendId);
    }

    return () => {
      setActiveConversationId(null);
    };
  }, [refreshConversation, selectedFriendId, setActiveConversationId]);

  useEffect(() => {
    if (!selectedFriendId) {
      return;
    }

    const unreadMessage = [...messages]
      .reverse()
      .find((message) => message.sender_id === selectedFriendId && !message.read_at);

    if (unreadMessage) {
      void markMessagesRead({
        with_user_id: selectedFriendId,
        up_to_message_id: unreadMessage.id,
      });
    }
  }, [markMessagesRead, messages, selectedFriendId]);
}
