import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import type { ChatResponse, UserResponse } from "@/lib/api";
import { useMemo } from "react";

type UseConversationEntriesParams = {
  chats: ChatResponse[];
  friends: UserResponse[];
  search: string;
};

export function useConversationEntries({
  chats,
  friends,
  search,
}: UseConversationEntriesParams) {
  const conversationEntries = useMemo<ConversationEntry[]>(() => {
    const entries = new Map<string, ConversationEntry>();

    chats.forEach((chat) => {
      entries.set(chat.friend.id, {
        friend: chat.friend,
        unreadCount: chat.unread_count ?? 0,
        lastMessage:
          chat.last_message?.type === "shared_task"
            ? "Task compartilhada"
            : chat.last_message?.content,
        lastMessageAt:
          chat.last_message?.created_at ?? chat.last_message?.received_at,
      });
    });

    friends.forEach((friend) => {
      if (!entries.has(friend.id)) {
        entries.set(friend.id, {
          friend,
          unreadCount: 0,
        });
      }
    });

    return [...entries.values()].sort((left, right) => {
      return (right.lastMessageAt ?? "").localeCompare(
        left.lastMessageAt ?? "",
      );
    });
  }, [chats, friends]);

  const filteredEntries = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return conversationEntries;
    }

    return conversationEntries.filter((entry) =>
      entry.friend.name.toLowerCase().includes(term),
    );
  }, [conversationEntries, search]);

  return {
    conversationEntries,
    filteredEntries,
  };
}
