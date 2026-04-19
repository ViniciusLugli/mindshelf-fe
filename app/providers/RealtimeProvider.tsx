"use client";

import { useSession } from "@/app/providers/SessionProvider";
import { websocketApi } from "@/lib/api";
import type {
  ChatResponse,
  FriendRequest,
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
  WebSocketResponseEnvelope,
  WebSocketServerAction,
} from "@/lib/api";
import { buildWebSocketUrl } from "@/lib/realtime/socket";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

type PendingRequest = {
  requestAction: WebSocketRequestAction;
  expectedAction: WebSocketServerAction;
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
};

type RealtimeSocialContextValue = {
  chats: ChatResponse[];
  friends: UserResponse[];
  pendingInvites: ReceivedFriendRequestResponse[];
  connectionStatus: ConnectionStatus;
  lastError: string | null;
  outgoingInviteIds: string[];
  refreshChats: () => Promise<ChatResponse[] | void>;
  refreshFriends: () => Promise<UserResponse[] | void>;
  refreshPendingInvites: () => Promise<ReceivedFriendRequestResponse[] | void>;
};

type RealtimeRelationshipActionsContextValue = {
  sendFriendRequest: (payload: FriendRequest) => Promise<StatusMessageResponse | void>;
  acceptFriendRequest: (payload: FriendRequest) => Promise<StatusMessageResponse | void>;
  rejectFriendRequest: (payload: FriendRequest) => Promise<StatusMessageResponse | void>;
  removeFriend: (payload: FriendRequest) => Promise<StatusMessageResponse | void>;
};

type RealtimeConversationContextValue = {
  messagesByUserId: Record<string, MessageResponse[]>;
  activeConversationId: string | null;
  setActiveConversationId: (friendId: string | null) => void;
  refreshConversation: (friendId: string) => Promise<MessageResponse[] | void>;
  sendMessage: (payload: SendChatRequest) => Promise<MessageResponse | void>;
  shareTask: (payload: ShareTaskRequest) => Promise<MessageResponse | void>;
  markMessagesRead: (
    payload: MarkMessagesReadRequest,
  ) => Promise<MarkMessagesReadResponse | void>;
  setImportedSharedTask: (payload: {
    friendId: string;
    messageId: string;
    importedTaskId: string;
  }) => void;
};

const RealtimeSocialContext = createContext<RealtimeSocialContextValue | null>(null);
const RealtimeRelationshipActionsContext =
  createContext<RealtimeRelationshipActionsContextValue | null>(null);
const RealtimeConversationContext =
  createContext<RealtimeConversationContextValue | null>(null);

function sortChats(chats: ChatResponse[]) {
  return [...chats].sort((left, right) => {
    const leftDate = left.last_message?.created_at ?? left.last_message?.received_at ?? "";
    const rightDate =
      right.last_message?.created_at ?? right.last_message?.received_at ?? "";

    return rightDate.localeCompare(leftDate);
  });
}

function upsertChat(
  chats: ChatResponse[],
  friend: UserResponse,
  message?: MessageResponse,
  unreadCount?: number,
) {
  const nextChats = [...chats];
  const index = nextChats.findIndex((item) => item.friend.id === friend.id);
  const current = index >= 0 ? nextChats[index] : undefined;
  const nextChat: ChatResponse = {
    friend,
    last_message: message ?? current?.last_message,
    unread_count: unreadCount ?? current?.unread_count ?? 0,
  };

  if (index >= 0) {
    nextChats[index] = nextChat;
  } else {
    nextChats.unshift(nextChat);
  }

  return sortChats(nextChats);
}

function appendMessage(
  current: Record<string, MessageResponse[]>,
  friendId: string,
  message: MessageResponse,
) {
  const conversation = current[friendId] ?? [];
  if (conversation.some((item) => item.id === message.id)) {
    return current;
  }

  return {
    ...current,
    [friendId]: [...conversation, message].sort((left, right) => {
      const leftDate = left.created_at ?? left.received_at ?? "";
      const rightDate = right.created_at ?? right.received_at ?? "";
      return leftDate.localeCompare(rightDate);
    }),
  };
}

function markConversationMessagesRead(
  current: Record<string, MessageResponse[]>,
  friendId: string,
  currentUserId: string,
  readAt?: string,
  fromCurrentUser = false,
) {
  const conversation = current[friendId] ?? [];

  return {
    ...current,
    [friendId]: conversation.map((message) => {
      const shouldMark = fromCurrentUser
        ? message.sender_id === currentUserId && !message.read_at
        : message.sender_id === friendId && !message.read_at;

      if (!shouldMark) {
        return message;
      }

      return {
        ...message,
        read_at: readAt ?? new Date().toISOString(),
      };
    }),
  };
}

function withImportedSharedTask(
  message: MessageResponse,
  messageId: string,
  importedTaskId: string,
) {
  if (message.id !== messageId || !message.shared_task) {
    return message;
  }

  return {
    ...message,
    shared_task: {
      ...message.shared_task,
      imported_task_id: importedTaskId,
    },
  };
}

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSession();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    "disconnected",
  );
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [friends, setFriends] = useState<UserResponse[]>([]);
  const [pendingInvites, setPendingInvites] = useState<
    ReceivedFriendRequestResponse[]
  >([]);
  const [messagesByUserId, setMessagesByUserId] = useState<
    Record<string, MessageResponse[]>
  >({});
  const [lastError, setLastError] = useState<string | null>(null);
  const [outgoingInviteIds, setOutgoingInviteIds] = useState<string[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null,
  );

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const reconnectAttemptRef = useRef(0);
  const shouldReconnectRef = useRef(false);
  const reconnectCallbackRef = useRef<() => void>(() => undefined);
  const pendingRequestsRef = useRef<PendingRequest[]>([]);
  const queuedMessagesRef = useRef<string[]>([]);
  const requestedConversationIdRef = useRef<string | null>(null);

  const safeSend = useCallback((payload: WebSocketRequestEnvelope) => {
    const message = JSON.stringify(payload);
    const socket = socketRef.current;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      return;
    }

    queuedMessagesRef.current.push(message);
  }, []);

  const resolvePendingRequest = useCallback(
    (response: WebSocketResponseEnvelope) => {
      const index = pendingRequestsRef.current.findIndex(
        (request) =>
          request.expectedAction === response.action ||
          (!response.success && request.requestAction === response.action),
      );

      if (index < 0) {
        return;
      }

      const [request] = pendingRequestsRef.current.splice(index, 1);

      if (!response.success) {
        request.reject(new Error(response.error ?? "WebSocket request failed."));
        return;
      }

      request.resolve(response.data);
    },
    [],
  );

  const sendRequest = useCallback(
    <TData,>(
      requestAction: WebSocketRequestAction,
      expectedAction: WebSocketServerAction,
      payload: WebSocketRequestEnvelope,
    ) => {
      setLastError(null);

      return new Promise<TData | void>((resolve, reject) => {
        pendingRequestsRef.current.push({
          requestAction,
          expectedAction,
          resolve: resolve as (value: unknown) => void,
          reject,
        });

        safeSend(payload);
      }).catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Realtime request failed.";
        setLastError(message);
        throw error;
      });
    },
    [safeSend],
  );

  const refreshChats = useCallback(async () => {
    return sendRequest<ChatResponse[]>(
      "get_chats",
      "get_chats",
      websocketApi.getChats(),
    );
  }, [sendRequest]);

  const refreshFriends = useCallback(async () => {
    return sendRequest<UserResponse[]>(
      "get_friends",
      "get_friends",
      websocketApi.getFriends(),
    );
  }, [sendRequest]);

  const refreshPendingInvites = useCallback(async () => {
    return sendRequest<ReceivedFriendRequestResponse[]>(
      "get_pending_friend_requests",
      "get_pending_friend_requests",
      websocketApi.getPendingFriendRequests(),
    );
  }, [sendRequest]);

  const refreshConversation = useCallback(
    async (friendId: string) => {
      requestedConversationIdRef.current = friendId;
      return sendRequest<MessageResponse[]>(
        "get_conversation",
        "get_conversation",
        websocketApi.getConversation({ with_user_id: friendId }),
      );
    },
    [sendRequest],
  );

  const syncSocialCollections = useCallback(async () => {
    await Promise.allSettled([
      refreshFriends(),
      refreshPendingInvites(),
      refreshChats(),
    ]);
  }, [refreshChats, refreshFriends, refreshPendingInvites]);

  const acceptFriendRequest = useCallback(
    async (payload: FriendRequest) => {
      const response = await sendRequest<StatusMessageResponse>(
        "accept_friend_request",
        "accept_friend_request",
        websocketApi.acceptFriendRequest(payload),
      );
      setOutgoingInviteIds((current) =>
        current.filter((friendId) => friendId !== payload.friend_id),
      );
      await syncSocialCollections();
      return response;
    },
    [sendRequest, syncSocialCollections],
  );

  const rejectFriendRequest = useCallback(
    async (payload: FriendRequest) => {
      const response = await sendRequest<StatusMessageResponse>(
        "reject_friend_request",
        "reject_friend_request",
        websocketApi.rejectFriendRequest(payload),
      );
      setOutgoingInviteIds((current) =>
        current.filter((friendId) => friendId !== payload.friend_id),
      );
      await syncSocialCollections();
      return response;
    },
    [sendRequest, syncSocialCollections],
  );

  const removeFriend = useCallback(
    async (payload: FriendRequest) => {
      const response = await sendRequest<StatusMessageResponse>(
        "remove_friend",
        "remove_friend",
        websocketApi.removeFriend(payload),
      );
      setOutgoingInviteIds((current) =>
        current.filter((friendId) => friendId !== payload.friend_id),
      );
      await syncSocialCollections();
      return response;
    },
    [sendRequest, syncSocialCollections],
  );

  const sendFriendRequest = useCallback(
    async (payload: FriendRequest) => {
      const response = await sendRequest<StatusMessageResponse>(
        "send_friend_request",
        "send_friend_request",
        websocketApi.sendFriendRequest(payload),
      );
      setOutgoingInviteIds((current) =>
        current.includes(payload.friend_id)
          ? current
          : [...current, payload.friend_id],
      );
      return response;
    },
    [sendRequest],
  );

  const sendMessage = useCallback(
    async (payload: SendChatRequest) => {
      return sendRequest<MessageResponse>(
        "send_message",
        "message_sent",
        websocketApi.sendMessage(payload),
      );
    },
    [sendRequest],
  );

  const shareTask = useCallback(
    async (payload: ShareTaskRequest) => {
      return sendRequest<MessageResponse>(
        "share_task",
        "message_sent",
        websocketApi.shareTask(payload),
      );
    },
    [sendRequest],
  );

  const markMessagesRead = useCallback(
    async (payload: MarkMessagesReadRequest) => {
      return sendRequest<MarkMessagesReadResponse>(
        "mark_messages_read",
        "mark_messages_read",
        websocketApi.markMessagesRead(payload),
      );
    },
    [sendRequest],
  );

  const setImportedSharedTask = useCallback(
    ({
      friendId,
      messageId,
      importedTaskId,
    }: {
      friendId: string;
      messageId: string;
      importedTaskId: string;
    }) => {
      setMessagesByUserId((current) => {
        const conversation = current[friendId];

        if (!conversation) {
          return current;
        }

        return {
          ...current,
          [friendId]: conversation.map((message) =>
            withImportedSharedTask(message, messageId, importedTaskId),
          ),
        };
      });

      setChats((current) =>
        current.map((chat) => {
          if (chat.friend.id !== friendId || !chat.last_message) {
            return chat;
          }

          return {
            ...chat,
            last_message: withImportedSharedTask(
              chat.last_message,
              messageId,
              importedTaskId,
            ),
          };
        }),
      );
    },
    [],
  );

  const connect = useCallback(() => {
    if (!currentUser || typeof window === "undefined") {
      return;
    }

    const existingSocket = socketRef.current;
    if (
      existingSocket &&
      (existingSocket.readyState === WebSocket.OPEN ||
        existingSocket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const wsUrl = buildWebSocketUrl();

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      reconnectAttemptRef.current = 0;
      setConnectionStatus("connected");
      setLastError(null);

      queuedMessagesRef.current.forEach((message) => socket.send(message));
      queuedMessagesRef.current = [];

      void syncSocialCollections();
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data) as WebSocketResponseEnvelope;
        resolvePendingRequest(response);

        if (!response.success) {
          setLastError(response.error ?? "Realtime event failed.");
          return;
        }

        switch (response.action) {
          case "get_chats": {
            const nextChats = Array.isArray(response.data)
              ? (response.data as ChatResponse[])
              : [];
            setChats(sortChats(nextChats));
            break;
          }
          case "get_friends": {
            setFriends(Array.isArray(response.data) ? (response.data as UserResponse[]) : []);
            break;
          }
          case "get_pending_friend_requests": {
            setPendingInvites(
              Array.isArray(response.data)
                ? (response.data as ReceivedFriendRequestResponse[])
                : [],
            );
            break;
          }
          case "get_conversation": {
            const friendId = requestedConversationIdRef.current;
            if (!friendId) {
              break;
            }
            setMessagesByUserId((current) => ({
              ...current,
              [friendId]: Array.isArray(response.data)
                ? (response.data as MessageResponse[])
                : [],
            }));
            break;
          }
          case "message_received":
          case "message_sent": {
            const message = response.data as MessageResponse | undefined;
            if (!message || !currentUser) {
              break;
            }

            const otherUser =
              message.sender_id === currentUser.id ? message.receiver : message.sender;
            const otherUserId =
              message.sender_id === currentUser.id
                ? message.receiver_id ?? otherUser?.id
                : message.sender_id ?? otherUser?.id;

            if (!otherUser || !otherUserId) {
              break;
            }

            setMessagesByUserId((current) =>
              appendMessage(current, otherUserId, message),
            );

            setChats((current) => {
              const activeUnreadCount = current.find(
                (chat) => chat.friend.id === otherUserId,
              )?.unread_count;
              const nextUnreadCount =
                response.action === "message_received" &&
                activeConversationId !== otherUserId
                  ? (activeUnreadCount ?? 0) + 1
                  : 0;

              return upsertChat(current, otherUser, message, nextUnreadCount);
            });

            if (response.action === "message_received" && activeConversationId === otherUserId) {
              void markMessagesRead({
                with_user_id: otherUserId,
                up_to_message_id: message.id,
              });
            }
            break;
          }
          case "mark_messages_read": {
            const payload = response.data as MarkMessagesReadResponse | undefined;
            if (!payload?.with_user_id || !currentUser) {
              break;
            }

            setMessagesByUserId((current) =>
              markConversationMessagesRead(
                current,
                payload.with_user_id ?? "",
                currentUser.id,
                payload.read_at,
              ),
            );
            setChats((current) =>
              current.map((chat) =>
                chat.friend.id === payload.with_user_id
                  ? { ...chat, unread_count: 0 }
                  : chat,
              ),
            );
            break;
          }
          case "messages_read": {
            const payload = response.data as MarkMessagesReadResponse | undefined;
            if (!payload?.with_user_id || !currentUser) {
              break;
            }

            setMessagesByUserId((current) =>
              markConversationMessagesRead(
                current,
                payload.with_user_id ?? "",
                currentUser.id,
                payload.read_at,
                true,
              ),
            );
            break;
          }
          default:
            break;
        }
      } catch {
        setLastError("Nao foi possivel interpretar a resposta em tempo real.");
      }
    };

    socket.onclose = (event) => {
      socketRef.current = null;
      setConnectionStatus("disconnected");

      if (!event.wasClean && shouldReconnectRef.current) {
        setLastError(
          `Conexao em tempo real encerrada (${event.code}). Verifique o backend em ${wsUrl}.`,
        );
      }

      if (!shouldReconnectRef.current) {
        return;
      }

      const nextAttempt = reconnectAttemptRef.current + 1;
      reconnectAttemptRef.current = nextAttempt;
      const timeout = Math.min(1000 * nextAttempt, 5000);

      reconnectTimerRef.current = window.setTimeout(() => {
        reconnectCallbackRef.current();
      }, timeout);
    };

    socket.onerror = () => {
      setLastError(
        `Falha na conexao em tempo real com ${wsUrl}. Confira o endpoint /api/ws e ALLOWED_ORIGINS no backend.`,
      );
    };
  }, [
    activeConversationId,
    currentUser,
    markMessagesRead,
    resolvePendingRequest,
    syncSocialCollections,
  ]);

  useEffect(() => {
    reconnectCallbackRef.current = connect;
  }, [connect]);

  useEffect(() => {
    shouldReconnectRef.current = Boolean(currentUser);

    if (!currentUser) {
      socketRef.current?.close();
      socketRef.current = null;
      return;
    }

    connect();

    return () => {
      shouldReconnectRef.current = false;
      if (reconnectTimerRef.current) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [connect, currentUser]);

  const socialValue = useMemo<RealtimeSocialContextValue>(
    () => ({
      chats,
      friends,
      pendingInvites,
      outgoingInviteIds,
      connectionStatus,
      lastError,
      refreshChats,
      refreshFriends,
      refreshPendingInvites,
    }),
    [
      chats,
      friends,
      pendingInvites,
      outgoingInviteIds,
      connectionStatus,
      lastError,
      refreshChats,
      refreshFriends,
      refreshPendingInvites,
    ],
  );

  const relationshipActionsValue = useMemo<RealtimeRelationshipActionsContextValue>(
    () => ({
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      removeFriend,
    }),
    [sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend],
  );

  const conversationValue = useMemo<RealtimeConversationContextValue>(
    () => ({
      messagesByUserId,
      activeConversationId,
      setActiveConversationId,
      refreshConversation,
      sendMessage,
      shareTask,
      markMessagesRead,
      setImportedSharedTask,
    }),
    [
      messagesByUserId,
      activeConversationId,
      refreshConversation,
      sendMessage,
      shareTask,
      markMessagesRead,
      setImportedSharedTask,
    ],
  );

  return (
    <RealtimeSocialContext.Provider value={socialValue}>
      <RealtimeRelationshipActionsContext.Provider value={relationshipActionsValue}>
        <RealtimeConversationContext.Provider value={conversationValue}>
          {children}
        </RealtimeConversationContext.Provider>
      </RealtimeRelationshipActionsContext.Provider>
    </RealtimeSocialContext.Provider>
  );
}

export function useRealtimeSocial() {
  const context = useContext(RealtimeSocialContext);

  if (!context) {
    throw new Error("useRealtimeSocial must be used inside RealtimeProvider");
  }

  return context;
}

export function useRealtimeRelationshipActions() {
  const context = useContext(RealtimeRelationshipActionsContext);

  if (!context) {
    throw new Error(
      "useRealtimeRelationshipActions must be used inside RealtimeProvider",
    );
  }

  return context;
}

export function useRealtimeConversation() {
  const context = useContext(RealtimeConversationContext);

  if (!context) {
    throw new Error(
      "useRealtimeConversation must be used inside RealtimeProvider",
    );
  }

  return context;
}

export function useRealtime() {
  return {
    ...useRealtimeSocial(),
    ...useRealtimeRelationshipActions(),
    ...useRealtimeConversation(),
  };
}
