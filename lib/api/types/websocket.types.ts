export type FriendRequest = {
  friend_id: string;
};

export type GetChatRequest = {
  with_user_id?: string;
};

export type SendChatRequest = {
  to_user_id?: string;
  content?: string;
};

export type MarkMessagesReadRequest = {
  up_to_message_id?: string;
  with_user_id?: string;
};

export type ShareTaskRequest = {
  content?: string;
  task_id?: string;
  to_user_id?: string;
};

export type SharedTaskSnapshotResponse = {
  group_color?: string;
  group_name?: string;
  imported_task_id?: string;
  notes?: string;
  source_task_id?: string;
  title?: string;
};

export type MessageType = "text" | "shared_task" | string;

export type MessageResponse = {
  content?: string;
  created_at?: string;
  id: string;
  read_at?: string;
  received_at?: string;
  receiver?: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
  receiver_id?: string;
  sender?: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
  sender_id?: string;
  shared_task?: SharedTaskSnapshotResponse;
  type?: MessageType;
};

export type ChatResponse = {
  friend: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
  last_message?: MessageResponse;
  unread_count?: number;
};

export type ReceivedFriendRequestResponse = {
  created_at?: string;
  requester: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
};

export type MarkMessagesReadResponse = {
  read_at?: string;
  updated?: number;
  with_user_id?: string;
};

export type WebSocketRequestAction =
  | "accept_friend_request"
  | "get_chats"
  | "get_conversation"
  | "get_friends"
  | "get_pending_friend_requests"
  | "mark_messages_read"
  | "reject_friend_request"
  | "remove_friend"
  | "send_friend_request"
  | "send_message"
  | "share_task";

export type WebSocketServerAction =
  | WebSocketRequestAction
  | "message_received"
  | "message_sent"
  | "messages_read";

export type WebSocketRequestEnvelope<TPayload = unknown> = {
  action: WebSocketRequestAction;
  payload: TPayload;
};

export type WebSocketResponseEnvelope<TData = unknown> = {
  action: WebSocketServerAction;
  success: boolean;
  data?: TData;
  error?: string;
};
