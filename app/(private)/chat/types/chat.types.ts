import type { UserResponse } from "@/lib/api";

export type ConversationEntry = {
  friend: UserResponse;
  unreadCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
};
