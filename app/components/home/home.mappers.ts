import { truncateText } from "@/lib/utils/text";
import type { HomeChat, ConversationItem } from "./home.types";

export function mapChatsToConversationItems(chats: HomeChat[]): ConversationItem[] {
  return chats
    .map((chat) => ({
      id: `chat-${chat.friend.id}`,
      friendId: chat.friend.id,
      friendName: chat.friend.name,
      friendEmail: chat.friend.email,
      friendAvatarUrl: chat.friend.avatar_url,
      createdAt: chat.last_message?.created_at ?? chat.last_message?.received_at,
      unreadCount: chat.unread_count ?? 0,
      preview:
        chat.last_message?.type === "shared_task"
          ? "Uma task foi compartilhada nessa conversa."
          : truncateText(
              chat.last_message?.content || "Abra a conversa para retomar o contexto.",
              112,
            ),
    }))
    .sort((left, right) => (right.createdAt ?? "").localeCompare(left.createdAt ?? ""))
    .slice(0, 5);
}
