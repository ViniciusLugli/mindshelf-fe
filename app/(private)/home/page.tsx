"use client";

import UserAvatar from "@/app/components/UI/UserAvatar";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useHomeActivityQuery } from "@/lib/api";
import { formatDateTime } from "@/lib/utils/date";
import { stripHtml, truncateText } from "@/lib/utils/text";
import Link from "next/link";
import { useMemo, useState } from "react";

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  createdAt?: string;
  badge: string;
};

export default function HomePage() {
  const { currentUser } = useSession();
  const {
    chats,
    friends,
    pendingInvites,
    connectionStatus,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useRealtime();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyInviteId, setBusyInviteId] = useState<string | null>(null);
  const homeActivityQuery = useHomeActivityQuery();
  const homeData = homeActivityQuery.data ?? { groups: [], tasks: [] };
  const isLoading = homeActivityQuery.isLoading;
  const queryFeedback =
    homeActivityQuery.error instanceof Error
      ? homeActivityQuery.error.message
      : homeActivityQuery.error
        ? "Nao foi possivel carregar suas atividades recentes."
        : null;

  const unreadCount = useMemo(
    () => chats.reduce((total, chat) => total + (chat.unread_count ?? 0), 0),
    [chats],
  );

  const recentFriends = friends.slice(0, 5);
  const recentChats = chats.slice(0, 5);

  const activityItems = useMemo<ActivityItem[]>(() => {
    const inviteItems = pendingInvites.map((invite) => ({
      id: `invite-${invite.requester.id}`,
      title: `${invite.requester.name} enviou um pedido de amizade`,
      description: invite.requester.email,
      href: "/contacts/pending",
      createdAt: invite.created_at,
      badge: "Pedido",
    }));

    const chatItems = chats.map((chat) => ({
      id: `chat-${chat.friend.id}`,
      title:
        (chat.unread_count ?? 0) > 0
          ? `${chat.friend.name} esta esperando sua resposta`
          : `Conversa com ${chat.friend.name}`,
      description:
        chat.last_message?.type === "shared_task"
          ? "Uma task foi compartilhada nessa conversa."
          : truncateText(
              chat.last_message?.content || "Abra a conversa para retomar o contexto.",
              88,
            ),
      href: `/chat/${chat.friend.id}`,
      createdAt: chat.last_message?.created_at ?? chat.last_message?.received_at,
      badge: (chat.unread_count ?? 0) > 0 ? "Nao lida" : "Chat",
    }));

    return [...inviteItems, ...chatItems]
      .sort((left, right) => (right.createdAt ?? "").localeCompare(left.createdAt ?? ""))
      .slice(0, 6);
  }, [chats, pendingInvites]);

  async function handleInviteAction(
    userId: string,
    action: "accept" | "reject",
  ) {
    setBusyInviteId(userId);
    setFeedback(null);

    try {
      if (action === "accept") {
        await acceptFriendRequest({ friend_id: userId });
      } else {
        await rejectFriendRequest({ friend_id: userId });
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Nao foi possivel responder ao pedido de amizade.",
      );
    } finally {
      setBusyInviteId(null);
    }
  }

  return (
    <section className="space-y-8 px-5 py-6">
      <header className="flex flex-col gap-5 border-b border-base-300/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Inicio
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            Bem-vindo de volta, {currentUser?.name || "usuario"}.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base">
            Este espaco existe para mostrar o que mudou desde a sua ultima visita: conversas, pedidos de amizade e lugares onde vale a pena retomar o trabalho.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-base-300/60 bg-base-100 px-4 py-3 text-sm text-base-content/60">
            {unreadCount} mensagem(ns) nao lida(s)
          </span>
          <span className="rounded-full border border-base-300/60 bg-base-100 px-4 py-3 text-sm text-base-content/60">
            {pendingInvites.length} pedido(s) pendente(s)
          </span>
          <span className="rounded-full border border-base-300/60 bg-base-100 px-4 py-3 text-sm text-base-content/60">
            {connectionStatus === "connected" ? "Tempo real ativo" : "Reconectando"}
          </span>
        </div>
      </header>

      {feedback || queryFeedback ? (
        <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback || queryFeedback}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Atividade recente
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-base-content">
                  O que aconteceu por ultimo
                </h2>
              </div>
              <Link href="/chat" className="btn btn-ghost rounded-full">
                Abrir chat
              </Link>
            </div>

            <div className="space-y-3">
              {activityItems.length ? (
                activityItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex flex-col gap-3 rounded-[1.6rem] border border-base-300/60 bg-base-100 px-4 py-4 transition-colors hover:border-primary/30 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-base-content">
                          {item.title}
                        </span>
                        <span className="badge border-0 bg-base-200 text-base-content/60">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-base-content/55">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xs text-base-content/35">
                      {formatDateTime(item.createdAt)}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.6rem] border border-dashed border-base-300/70 px-4 py-14 text-center text-sm text-base-content/45">
                  Ainda nao ha atividade recente para mostrar.
                </div>
              )}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                    Continue escrevendo
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-base-content">
                    Tasks recentes
                  </h2>
                </div>
                <Link href="/tasks" className="text-sm font-medium text-primary">
                  Ver todas
                </Link>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  <div className="rounded-[1.6rem] border border-dashed border-base-300/70 px-4 py-12 text-center text-sm text-base-content/45">
                    Carregando tasks...
                  </div>
                ) : homeData.tasks.length ? (
                  homeData.tasks.map((task) => (
                    <Link
                      key={task.id ?? `${task.group_id}-${task.title}`}
                      href={task.id ? `/tasks/${task.id}` : "/tasks"}
                      className="block rounded-[1.6rem] border border-base-300/60 bg-base-100 px-4 py-4 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-base-content">{task.title}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-base-content/30">
                            {task.group_name}
                          </p>
                        </div>
                        <span
                          className="mt-1 h-3 w-3 rounded-full"
                          style={{ backgroundColor: task.group_color }}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-base-content/55">
                        {truncateText(
                          stripHtml(task.notes) || "Abra a task para continuar o raciocinio.",
                          135,
                        )}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-[1.6rem] border border-dashed border-base-300/70 px-4 py-12 text-center text-sm text-base-content/45">
                    Nenhuma task recente por aqui.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                    Volte para um contexto
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-base-content">
                    Grupos recentes
                  </h2>
                </div>
                <Link href="/groups" className="text-sm font-medium text-primary">
                  Ver grupos
                </Link>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  <div className="rounded-[1.6rem] border border-dashed border-base-300/70 px-4 py-12 text-center text-sm text-base-content/45">
                    Carregando grupos...
                  </div>
                ) : homeData.groups.length ? (
                  homeData.groups.map((group) => (
                    <Link
                      key={group.id}
                      href={`/groups/${group.id}`}
                      className="flex items-center gap-4 rounded-[1.6rem] border border-base-300/60 bg-base-100 px-4 py-4 transition-colors hover:border-primary/30"
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold text-white"
                        style={{ backgroundColor: group.color }}
                      >
                        {group.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-base-content">{group.name}</p>
                        <p className="mt-1 text-sm text-base-content/52">
                          Abra o grupo para rever tasks e seguir de onde parou.
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-[1.6rem] border border-dashed border-base-300/70 px-4 py-12 text-center text-sm text-base-content/45">
                    Crie um grupo para comecar a organizar seus assuntos.
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-8">
          <section className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <UserAvatar
                name={currentUser?.name || "Usuario"}
                avatarUrl={currentUser?.avatar_url}
                size="lg"
              />
              <div>
                <p className="text-lg font-semibold text-base-content">
                  {currentUser?.name || "Sua conta"}
                </p>
                <p className="text-sm text-base-content/50">
                  {currentUser?.email || "Sem email carregado"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/account" className="btn btn-ghost rounded-full">
                Minha conta
              </Link>
              <Link href="/groups/new" className="btn btn-primary rounded-full">
                Novo grupo
              </Link>
            </div>
          </section>

          <section className="space-y-4 rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Pedidos de amizade
                </p>
                <h2 className="mt-2 text-xl font-semibold text-base-content">
                  Respondidos rapido daqui
                </h2>
              </div>
              <Link href="/contacts/pending" className="text-sm font-medium text-primary">
                Ver tudo
              </Link>
            </div>

            <div className="space-y-3">
              {pendingInvites.length ? (
                pendingInvites.slice(0, 3).map((invite) => (
                  <article
                    key={invite.requester.id}
                    className="rounded-[1.5rem] border border-base-300/60 bg-base-200/25 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        name={invite.requester.name}
                        avatarUrl={invite.requester.avatar_url}
                        size="md"
                      />
                      <div>
                        <p className="font-semibold text-base-content">
                          {invite.requester.name}
                        </p>
                        <p className="text-sm text-base-content/50">
                          {invite.requester.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm flex-1 rounded-full"
                        disabled={busyInviteId === invite.requester.id}
                        onClick={() => void handleInviteAction(invite.requester.id, "accept")}
                      >
                        Aceitar
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm flex-1 rounded-full"
                        disabled={busyInviteId === invite.requester.id}
                        onClick={() => void handleInviteAction(invite.requester.id, "reject")}
                      >
                        Recusar
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Nenhum pedido pendente agora.
                </div>
              )}
            </div>
          </section>

          <section className="space-y-4 rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Pessoas
                </p>
                <h2 className="mt-2 text-xl font-semibold text-base-content">
                  Amigos para retomar contato
                </h2>
              </div>
              <Link href="/chat" className="text-sm font-medium text-primary">
                Ver chat
              </Link>
            </div>

            <div className="space-y-3">
              {recentFriends.length ? (
                recentFriends.map((friend) => (
                  <Link
                    key={friend.id}
                    href={`/chat/${friend.id}`}
                    className="flex items-center gap-3 rounded-[1.4rem] border border-base-300/60 bg-base-100 px-3 py-3 transition-colors hover:border-primary/30"
                  >
                    <UserAvatar
                      name={friend.name}
                      avatarUrl={friend.avatar_url}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-base-content">
                        {friend.name}
                      </p>
                      <p className="truncate text-sm text-base-content/50">
                        {friend.email}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Seus contatos vao aparecer aqui assim que as amizades forem aceitas.
                </div>
              )}
            </div>
          </section>

          <section className="space-y-4 rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Conversas recentes
                </p>
                <h2 className="mt-2 text-xl font-semibold text-base-content">
                  Quem falou com voce por ultimo
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {recentChats.length ? (
                recentChats.map((chat) => (
                  <Link
                    key={chat.friend.id}
                    href={`/chat/${chat.friend.id}`}
                    className="block rounded-[1.5rem] border border-base-300/60 bg-base-200/25 px-4 py-4 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-base-content">
                          {chat.friend.name}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-base-content/55">
                          {chat.last_message?.type === "shared_task"
                            ? "Uma task foi compartilhada nessa conversa."
                            : truncateText(
                                chat.last_message?.content || "Abra para retomar a conversa.",
                                88,
                              )}
                        </p>
                      </div>
                      {(chat.unread_count ?? 0) > 0 ? (
                        <span className="badge badge-error border-0 text-white">
                          {chat.unread_count}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Suas conversas vao aparecer aqui quando o fluxo comecar.
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
