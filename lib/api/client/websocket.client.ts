import { httpGet, httpPost } from "../http";
import type {
  FriendRequest,
  GetChatRequest,
  SendChatRequest,
  SimpleMessageResponse,
} from "../types";

export const websocketApi = {
  acceptFriendRequest(payload: FriendRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, FriendRequest>(
      "/ws/accept_friend_request",
      payload,
    );
  },

  getChats(): Promise<SimpleMessageResponse> {
    return httpGet<SimpleMessageResponse>("/ws/get_chats");
  },

  getConversation(payload: GetChatRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, GetChatRequest>(
      "/ws/get_conversation",
      payload,
    );
  },

  getFriends(): Promise<SimpleMessageResponse> {
    return httpGet<SimpleMessageResponse>("/ws/get_friends");
  },

  rejectFriendRequest(payload: FriendRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, FriendRequest>(
      "/ws/reject_friend_request",
      payload,
    );
  },

  sendFriendRequest(payload: FriendRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, FriendRequest>(
      "/ws/send_friend_request",
      payload,
    );
  },

  sendMessage(payload: SendChatRequest): Promise<SimpleMessageResponse> {
    return httpPost<SimpleMessageResponse, SendChatRequest>(
      "/ws/send_message",
      payload,
    );
  },
};
