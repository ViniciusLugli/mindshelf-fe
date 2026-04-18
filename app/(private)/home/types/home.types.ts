import type { GroupResponse, TaskResponse } from "@/lib/api";
import type {
  ChatResponse,
  ReceivedFriendRequestResponse,
  UserResponse,
} from "@/lib/api";

export type ConversationItem = {
  id: string;
  friendId: string;
  friendName: string;
  friendEmail: string;
  friendAvatarUrl?: string | null;
  createdAt?: string;
  unreadCount: number;
  preview: string;
};

export type HomeActivityData = {
  groups: GroupResponse[];
  tasks: TaskResponse[];
};

export type HomeInvite = ReceivedFriendRequestResponse;
export type HomeFriend = UserResponse;
export type HomeChat = ChatResponse;
