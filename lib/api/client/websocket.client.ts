import type {
  ChatResponse,
  FriendRequest,
  GetChatRequest,
  MarkMessagesReadRequest,
  MarkMessagesReadResponse,
  MessageResponse,
  ReceivedFriendRequestResponse,
  SendChatRequest,
  ShareTaskRequest,
  StatusMessageResponse,
  UserResponse,
  WebSocketRequestAction,
  WebSocketRequestEnvelope,
} from "../types";

function createWebSocketRequest<TPayload>(
  action: WebSocketRequestAction,
  payload: TPayload,
): WebSocketRequestEnvelope<TPayload> {
  return {
    action,
    payload,
  };
}

export const websocketApi = {
  acceptFriendRequest(payload: FriendRequest) {
    return createWebSocketRequest("accept_friend_request", payload);
  },

  getChats() {
    return createWebSocketRequest<null>("get_chats", null);
  },

  getConversation(payload: GetChatRequest) {
    return createWebSocketRequest("get_conversation", payload);
  },

  getFriends() {
    return createWebSocketRequest<null>("get_friends", null);
  },

  getPendingFriendRequests() {
    return createWebSocketRequest<null>("get_pending_friend_requests", null);
  },

  rejectFriendRequest(payload: FriendRequest) {
    return createWebSocketRequest("reject_friend_request", payload);
  },

  removeFriend(payload: FriendRequest) {
    return createWebSocketRequest("remove_friend", payload);
  },

  sendFriendRequest(payload: FriendRequest) {
    return createWebSocketRequest("send_friend_request", payload);
  },

  sendMessage(payload: SendChatRequest) {
    return createWebSocketRequest("send_message", payload);
  },

  markMessagesRead(payload: MarkMessagesReadRequest) {
    return createWebSocketRequest("mark_messages_read", payload);
  },

  shareTask(payload: ShareTaskRequest) {
    return createWebSocketRequest("share_task", payload);
  },
};

export type WebSocketActionDataMap = {
  accept_friend_request: StatusMessageResponse;
  get_chats: ChatResponse[];
  get_conversation: MessageResponse[];
  get_friends: UserResponse[];
  get_pending_friend_requests: ReceivedFriendRequestResponse[];
  mark_messages_read: MarkMessagesReadResponse;
  reject_friend_request: StatusMessageResponse;
  remove_friend: StatusMessageResponse;
  send_friend_request: StatusMessageResponse;
  send_message: MessageResponse;
  share_task: MessageResponse;
  message_received: MessageResponse;
  message_sent: MessageResponse;
  messages_read: MarkMessagesReadResponse;
};
