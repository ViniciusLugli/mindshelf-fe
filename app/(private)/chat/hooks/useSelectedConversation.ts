import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import type { MessageResponse } from "@/lib/api";
import { useMemo } from "react";

type UseSelectedConversationParams = {
  initialFriendId?: string | null;
  conversationEntries: ConversationEntry[];
  filteredEntries: ConversationEntry[];
  messagesByUserId: Record<string, MessageResponse[]>;
};

export function useSelectedConversation({
  initialFriendId,
  conversationEntries,
  filteredEntries,
  messagesByUserId,
}: UseSelectedConversationParams) {
  const selectedFriendId = useMemo(() => {
    if (initialFriendId) {
      return initialFriendId;
    }

    return (
      filteredEntries[0]?.friend.id ?? conversationEntries[0]?.friend.id ?? null
    );
  }, [conversationEntries, filteredEntries, initialFriendId]);

  const selectedEntry = useMemo(
    () =>
      conversationEntries.find(
        (entry) => entry.friend.id === selectedFriendId,
      ) ?? null,
    [conversationEntries, selectedFriendId],
  );

  const selectedFriend = selectedEntry?.friend ?? null;

  const messages = useMemo(
    () => (selectedFriendId ? (messagesByUserId[selectedFriendId] ?? []) : []),
    [messagesByUserId, selectedFriendId],
  );

  return {
    selectedFriendId,
    selectedEntry,
    selectedFriend,
    messages,
  };
}
