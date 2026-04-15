"use client";

import SearchField from "@/app/components/UI/SearchField";
import UserAvatar from "@/app/components/UI/UserAvatar";
import TaskCard from "@/app/components/tasks/TaskCard";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { taskApi } from "@/lib/api";
import type { TaskResponse, UserResponse } from "@/lib/api";
import { formatDateTime, formatTime } from "@/lib/utils/date";
import { stripHtml, truncateText } from "@/lib/utils/text";
import { Share, Wifi, WifiOff } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ConversationEntry = {
  friend: UserResponse;
  unreadCount: number;
  lastMessage?: string;
  lastMessageAt?: string;
};

function ChatMessage({
  isMine,
  message,
}: {
  isMine: boolean;
  message: {
    id: string;
    content?: string;
    type?: string;
    created_at?: string;
    read_at?: string;
    shared_task?: {
      source_task_id?: string;
      title?: string;
      notes?: string;
      group_name?: string;
      group_color?: string;
    };
  };
}) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-[1.6rem] px-4 py-3 shadow-sm ${
          isMine
            ? "bg-primary text-primary-content"
            : "border border-base-300/70 bg-base-100 text-base-content"
        }`}
      >
        {message.type === "shared_task" && message.shared_task ? (
          <div className="space-y-3">
            <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${isMine ? "text-primary-content/70" : "text-base-content/35"}`}>
              Task compartilhada
            </p>
            <TaskCard
              title={message.shared_task.title || "Task compartilhada"}
              notes={stripHtml(message.shared_task.notes)}
              groupName={message.shared_task.group_name || "Grupo"}
              groupColor={message.shared_task.group_color || "#E76F51"}
              href={message.shared_task.source_task_id ? `/tasks/${message.shared_task.source_task_id}` : undefined}
            />
            {message.content ? (
              <p className={`text-sm leading-relaxed ${isMine ? "text-primary-content/85" : "text-base-content/70"}`}>
                {message.content}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}

        <div className={`mt-3 flex items-center justify-end gap-2 text-[11px] ${isMine ? "text-primary-content/70" : "text-base-content/40"}`}>
          <span>{formatTime(message.created_at)}</span>
          {isMine ? <span>{message.read_at ? "Lida" : "Enviada"}</span> : null}
        </div>
      </div>
    </div>
  );
}

export default function ChatWorkspace({
  initialFriendId,
}: {
  initialFriendId?: string | null;
}) {
  const { currentUser } = useSession();
  const {
    chats,
    friends,
    messagesByUserId,
    connectionStatus,
    setActiveConversationId,
    refreshConversation,
    markMessagesRead,
    sendMessage,
    shareTask,
  } = useRealtime();

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [sharingOpen, setSharingOpen] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");
  const [shareableTasks, setShareableTasks] = useState<TaskResponse[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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
      return (right.lastMessageAt ?? "").localeCompare(left.lastMessageAt ?? "");
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

  const selectedFriendId = useMemo(() => {
    if (initialFriendId) {
      return initialFriendId;
    }

    return filteredEntries[0]?.friend.id ?? conversationEntries[0]?.friend.id ?? null;
  }, [conversationEntries, filteredEntries, initialFriendId]);

  const selectedEntry =
    conversationEntries.find((entry) => entry.friend.id === selectedFriendId) ?? null;
  const selectedFriend = selectedEntry?.friend ?? null;
  const messages = useMemo(
    () => (selectedFriendId ? messagesByUserId[selectedFriendId] ?? [] : []),
    [messagesByUserId, selectedFriendId],
  );

  useEffect(() => {
    setActiveConversationId(selectedFriendId);

    if (selectedFriendId) {
      void refreshConversation(selectedFriendId);
    }

    return () => {
      setActiveConversationId(null);
    };
  }, [refreshConversation, selectedFriendId, setActiveConversationId]);

  useEffect(() => {
    if (!selectedFriendId) {
      return;
    }

    const unreadMessage = [...messages]
      .reverse()
      .find((message) => message.sender_id === selectedFriendId && !message.read_at);

    if (unreadMessage) {
      void markMessagesRead({
        with_user_id: selectedFriendId,
        up_to_message_id: unreadMessage.id,
      });
    }
  }, [markMessagesRead, messages, selectedFriendId]);

  useEffect(() => {
    let cancelled = false;
    const loadTasks = async () => {
      if (!sharingOpen) {
        return;
      }

      setIsLoadingTasks(true);
      try {
        const response = taskSearch.trim()
          ? await taskApi.getByTitle(taskSearch.trim(), 1, 20)
          : await taskApi.getPaginated(1, 20);
        if (!cancelled) {
          setShareableTasks(response.data);
        }
      } catch {
        if (!cancelled) {
          setShareableTasks([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingTasks(false);
        }
      }
    };

    const timeout = window.setTimeout(loadTasks, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [sharingOpen, taskSearch]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFriendId || !draft.trim()) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await sendMessage({ to_user_id: selectedFriendId, content: draft.trim() });
      setDraft("");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Nao foi possivel enviar a mensagem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareTask = async (taskId: string) => {
    if (!selectedFriendId) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await shareTask({ to_user_id: selectedFriendId, task_id: taskId });
      setSharingOpen(false);
      setTaskSearch("");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Nao foi possivel compartilhar a task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6 px-5 py-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Conversas
          </p>
          <h1 className="text-3xl font-bold text-base-content">Chat com seus amigos</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-base-content/55">
            Converse em tempo real, acompanhe o que ainda nao foi lido e compartilhe tasks direto na conversa.
          </p>
        </div>

        <div className="badge badge-lg gap-2 rounded-full border border-base-300/60 bg-base-100 px-4 py-4 text-sm font-medium text-base-content/60">
          {connectionStatus === "connected" ? (
            <Wifi fontSize="small" className="text-success" />
          ) : (
            <WifiOff fontSize="small" className="text-warning" />
          )}
          {connectionStatus === "connected" ? "Conectado" : "Reconectando"}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-[2rem] border border-base-300/70 bg-base-100/90 p-4 shadow-sm">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Procure por um amigo"
          />

          <div className="space-y-2">
            {filteredEntries.length ? (
              filteredEntries.map((entry) => (
                <Link
                  key={entry.friend.id}
                  href={`/chat/${entry.friend.id}`}
                  className={`flex items-center gap-3 rounded-[1.5rem] border px-3 py-3 transition-all ${
                    selectedFriendId === entry.friend.id
                      ? "border-primary/30 bg-primary/8"
                      : "border-base-300/60 bg-base-100 hover:border-base-300"
                  }`}
                >
                  <UserAvatar
                    name={entry.friend.name}
                    avatarUrl={entry.friend.avatar_url}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-base-content">{entry.friend.name}</p>
                        <p className="text-xs text-base-content/40">{entry.friend.email}</p>
                      </div>
                      {entry.unreadCount > 0 ? (
                        <span className="badge badge-error border-0 text-white">
                          {entry.unreadCount}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-base-content/55">
                      {truncateText(entry.lastMessage || "Nenhuma mensagem ainda.", 46)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-8 text-center text-sm text-base-content/50">
                Nenhuma conversa encontrada.
              </div>
            )}
          </div>
        </aside>

        <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 shadow-sm">
          {selectedFriend ? (
            <>
              <div className="flex flex-col gap-4 border-b border-base-300/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <UserAvatar
                    name={selectedFriend.name}
                    avatarUrl={selectedFriend.avatar_url}
                    size="lg"
                  />
                  <div>
                    <p className="text-xl font-semibold text-base-content">
                      {selectedFriend.name}
                    </p>
                    <p className="text-sm text-base-content/50">{selectedFriend.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-base-content/30">
                      {messages.length} mensagens carregadas
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/account/${selectedFriend.id}`} className="btn btn-ghost rounded-full">
                    Ver perfil
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary rounded-full"
                    onClick={() => setSharingOpen(true)}
                  >
                    <Share fontSize="small" />
                    Compartilhar task
                  </button>
                </div>
              </div>

              <div className="flex min-h-[540px] flex-col">
                <div className="flex-1 space-y-4 bg-base-200/30 px-5 py-5">
                  {messages.length ? (
                    messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        isMine={message.sender_id === currentUser?.id}
                        message={message}
                      />
                    ))
                  ) : (
                    <div className="flex h-full min-h-64 items-center justify-center rounded-[1.5rem] border border-dashed border-base-300/70 bg-base-100/50 text-sm text-base-content/45">
                      Comece a conversa com {selectedFriend.name}.
                    </div>
                  )}
                </div>

                <div className="border-t border-base-300/60 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-base-content/35">
                    <span>{selectedEntry?.unreadCount ? `${selectedEntry.unreadCount} nao lidas` : "Tudo em dia"}</span>
                    <span>
                      {messages.at(-1)?.created_at
                        ? `Ultima atividade ${formatDateTime(messages.at(-1)?.created_at)}`
                        : "Nova conversa"}
                    </span>
                  </div>

                  <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSendMessage}>
                    <textarea
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={`Escreva uma mensagem para ${selectedFriend.name}`}
                      className="textarea textarea-bordered min-h-24 flex-1 rounded-[1.5rem] border-base-300/70 bg-base-100 px-4 py-3"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !draft.trim()}
                      className="btn btn-primary min-h-24 rounded-[1.5rem] px-6"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                  </form>

                  {feedback ? (
                    <div className="mt-3 rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
                      {feedback}
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[640px] items-center justify-center px-6 text-center">
              <div className="max-w-md space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                  Nenhuma conversa selecionada
                </p>
                <h2 className="text-3xl font-semibold text-base-content">
                  Escolha um amigo para abrir o chat.
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>

      {sharingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/35 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Fechar modal"
            className="absolute inset-0"
            onClick={() => setSharingOpen(false)}
          />
          <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-base-300/70 bg-base-100 shadow-2xl">
            <div className="space-y-2 border-b border-base-300/60 px-6 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                Compartilhar task
              </p>
              <h2 className="text-2xl font-semibold text-base-content">
                Envie uma task para {selectedFriend?.name}
              </h2>
            </div>

            <div className="space-y-5 px-6 py-6">
              <SearchField
                value={taskSearch}
                onChange={setTaskSearch}
                placeholder="Procure uma task pelo titulo"
              />

              <div className="grid gap-4 md:grid-cols-2">
                {isLoadingTasks ? (
                  <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                    Carregando tasks...
                  </div>
                ) : shareableTasks.length ? (
                  shareableTasks.map((task) => (
                    <button
                      key={task.id ?? `${task.group_id}-${task.title}`}
                      type="button"
                      className="text-left"
                      onClick={() => task.id && handleShareTask(task.id)}
                      disabled={!task.id || isSubmitting}
                    >
                      <TaskCard
                        id={task.id}
                        title={task.title}
                        notes={stripHtml(task.notes)}
                        groupName={task.group_name}
                        groupColor={task.group_color}
                      />
                    </button>
                  ))
                ) : (
                  <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                    Nenhuma task encontrada.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
