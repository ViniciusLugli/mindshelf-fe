import { truncateText } from "@/lib/utils/text";
import type { HomeChat, ConversationItem } from "../types/home.types";

export function mapChatsToConversationItems(
  chats: HomeChat[],
): ConversationItem[] {
  return chats
    .map((chat) => ({
      id: `chat-${chat.friend.id}`,
      friendId: chat.friend.id,
      friendName: chat.friend.name,
      friendEmail: chat.friend.email,
      friendAvatarUrl: chat.friend.avatar_url,
      createdAt:
        chat.last_message?.created_at ?? chat.last_message?.received_at,
      unreadCount: chat.unread_count ?? 0,
      preview:
        chat.last_message?.type === "shared_task"
          ? "A note was shared in this conversation."
          : truncateText(
              chat.last_message?.content ||
                "Open the conversation to pick up the context.",
              112,
            ),
    }))
    .sort((left, right) =>
      (right.createdAt ?? "").localeCompare(left.createdAt ?? ""),
    )
    .slice(0, 5);
}
