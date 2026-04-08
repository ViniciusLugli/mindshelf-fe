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

export type MarkMessagesRead = {
  up_to_message_id: string;
  with_user_id: string;
};
