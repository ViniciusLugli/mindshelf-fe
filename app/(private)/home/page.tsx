"use client";

import UserAvatar from "@/app/components/UI/UserAvatar";
import GroupCard from "@/app/components/shared/Cards/GroupCard";
import TaskCard from "@/app/components/tasks/TaskCard";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { groupApi, taskApi } from "@/lib/api";
import type { GroupResponse, TaskResponse } from "@/lib/api/types";
import { formatDateTime } from "@/lib/utils/date";
import { stripHtml, truncateText } from "@/lib/utils/text";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DashboardState = {
  groups: GroupResponse[];
  groupTotal: number;
  tasks: TaskResponse[];
  taskTotal: number;
};

const initialDashboardState: DashboardState = {
  groups: [],
  groupTotal: 0,
  tasks: [],
  taskTotal: 0,
};

export default function HomePage() {
  const { currentUser } = useSession();
  const { chats, friends, pendingInvites } = useRealtime();
  const [dashboardState, setDashboardState] = useState(initialDashboardState);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      setIsLoading(true);

      try {
        const [groupsResponse, tasksResponse] = await Promise.all([
          groupApi.getPaginated(1, 4),
          taskApi.getPaginated(1, 4),
        ]);

        if (cancelled) {
          return;
        }

        setDashboardState({
          groups: groupsResponse.data,
          groupTotal: groupsResponse.total,
          tasks: tasksResponse.data,
          taskTotal: tasksResponse.total,
        });
        setFeedback(null);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setFeedback(
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar o resumo da sua area.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const unreadMessages = useMemo(
    () => chats.reduce((total, chat) => total + (chat.unread_count ?? 0), 0),
    [chats],
  );

  const recentChats = chats.slice(0, 4);

  return (
    <section className="space-y-8 px-5 py-6">
      <div className="relative overflow-hidden rounded-[2.4rem] border border-base-300/70 bg-base-100/95 shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,111,81,0.18),transparent_30%),radial-gradient(circle_at_75%_25%,rgba(42,157,143,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.3),transparent)]" />

        <div className="relative grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:px-8 lg:py-10">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-base-content/35">
                Painel principal
              </p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
                Bem-vindo de volta, {currentUser?.name || "usuario"}.
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base">
                Aqui voce acompanha seus grupos, encontra suas tasks mais recentes e
                retoma conversas com quem esta construindo junto com voce no MindShelf.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-[1.5rem] border border-base-300/60 bg-base-100/85 p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Grupos
                </p>
                <p className="mt-3 text-3xl font-bold text-base-content">
                  {dashboardState.groupTotal}
                </p>
                <p className="mt-1 text-sm text-base-content/50">
                  Espacos ativos para organizar seu conhecimento.
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-base-300/60 bg-base-100/85 p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Tasks
                </p>
                <p className="mt-3 text-3xl font-bold text-base-content">
                  {dashboardState.taskTotal}
                </p>
                <p className="mt-1 text-sm text-base-content/50">
                  Notas e tarefas prontas para evoluir.
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-base-300/60 bg-base-100/85 p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Amigos
                </p>
                <p className="mt-3 text-3xl font-bold text-base-content">
                  {friends.length}
                </p>
                <p className="mt-1 text-sm text-base-content/50">
                  Pessoas com quem voce pode conversar e compartilhar ideias.
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-base-300/60 bg-base-100/85 p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Nao lidas
                </p>
                <p className="mt-3 text-3xl font-bold text-base-content">
                  {unreadMessages}
                </p>
                <p className="mt-1 text-sm text-base-content/50">
                  {pendingInvites.length} convite(s) pendente(s) aguardando resposta.
                </p>
              </article>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/groups" className="btn btn-primary rounded-full px-6">
                Explorar grupos
              </Link>
              <Link href="/tasks" className="btn btn-ghost rounded-full px-6">
                Ver tasks
              </Link>
              <Link href="/chat" className="btn btn-ghost rounded-full px-6">
                Abrir chat
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-base-300/70 bg-base-100/90 p-5 shadow-sm">
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

            <div className="mt-5 space-y-3 rounded-[1.5rem] border border-base-300/60 bg-base-200/35 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-base-content">
                    Convites recebidos
                  </p>
                  <p className="text-xs text-base-content/45">
                    Responda quem quer se conectar com voce.
                  </p>
                </div>
                <span className="badge badge-primary badge-lg">
                  {pendingInvites.length}
                </span>
              </div>
              <Link href="/contacts/pending" className="btn btn-primary w-full rounded-full">
                Gerenciar convites
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-base-content">Conversas recentes</h2>
                <Link href="/chat" className="text-sm font-medium text-primary">
                  Ver tudo
                </Link>
              </div>

              {recentChats.length ? (
                recentChats.map((chat) => (
                  <Link
                    key={chat.friend.id}
                    href={`/chat/${chat.friend.id}`}
                    className="flex items-center gap-3 rounded-[1.3rem] border border-base-300/60 bg-base-100 px-3 py-3 transition-colors hover:border-primary/30"
                  >
                    <UserAvatar
                      name={chat.friend.name}
                      avatarUrl={chat.friend.avatar_url}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate font-semibold text-base-content">
                          {chat.friend.name}
                        </p>
                        {(chat.unread_count ?? 0) > 0 ? (
                          <span className="badge badge-error border-0 text-white">
                            {chat.unread_count}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-base-content/50">
                        {chat.last_message?.type === "shared_task"
                          ? "Task compartilhada"
                          : truncateText(chat.last_message?.content || "Sem mensagens recentes.", 48)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.3rem] border border-dashed border-base-300/70 px-4 py-8 text-sm text-base-content/45">
                  Suas conversas vao aparecer aqui quando voce adicionar amigos.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-5 rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Seus grupos
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-base-content">
                Continue de onde parou
              </h2>
            </div>
            <Link href="/groups" className="btn btn-ghost rounded-full">
              Ver grupos
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-14 text-center text-sm text-base-content/45">
              Carregando grupos...
            </div>
          ) : dashboardState.groups.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardState.groups.map((group) => (
                <GroupCard
                  key={group.id}
                  title={group.name}
                  color={group.color}
                  href={`/groups/${group.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-14 text-center text-sm text-base-content/45">
              Ainda nao ha grupos para mostrar. Crie o primeiro e comece a organizar suas ideias.
            </div>
          )}
        </div>

        <div className="space-y-5 rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Tasks recentes
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-base-content">
                Notas que merecem atencao
              </h2>
            </div>
            <Link href="/tasks" className="btn btn-ghost rounded-full">
              Ver tasks
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-14 text-center text-sm text-base-content/45">
              Carregando tasks...
            </div>
          ) : dashboardState.tasks.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {dashboardState.tasks.map((task) => (
                <TaskCard
                  key={task.id ?? `${task.group_id}-${task.title}`}
                  id={task.id}
                  title={task.title}
                  notes={stripHtml(task.notes)}
                  groupName={task.group_name}
                  groupColor={task.group_color}
                  href={task.id ? `/tasks/${task.id}` : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-14 text-center text-sm text-base-content/45">
              Quando voce criar uma task, ela vai aparecer aqui com atalho direto para edicao.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
              Ritmo da semana
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-base-content">
              O que esta movimentando seu espaco agora
            </h2>
          </div>

          <Link href="/account" className="btn btn-ghost rounded-full">
            Ajustar conta
          </Link>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-base-300/60 bg-base-200/30 p-4">
            <p className="text-sm font-semibold text-base-content">Ultima task carregada</p>
            <p className="mt-3 text-base leading-relaxed text-base-content/65">
              {dashboardState.tasks[0]
                ? `${dashboardState.tasks[0].title} em ${dashboardState.tasks[0].group_name}.`
                : "Crie uma task para ter um resumo rapido do que esta em andamento."}
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-base-300/60 bg-base-200/30 p-4">
            <p className="text-sm font-semibold text-base-content">Contato mais recente</p>
            <p className="mt-3 text-base leading-relaxed text-base-content/65">
              {recentChats[0]
                ? `${recentChats[0].friend.name} teve atividade em ${formatDateTime(recentChats[0].last_message?.created_at ?? recentChats[0].last_message?.received_at)}.`
                : "Quando houver mensagens recentes, voce vera aqui quem esta puxando conversa."}
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-base-300/60 bg-base-200/30 p-4">
            <p className="text-sm font-semibold text-base-content">Proximo passo</p>
            <p className="mt-3 text-base leading-relaxed text-base-content/65">
              {dashboardState.groups.length
                ? "Abra um grupo, refine uma task e compartilhe com um amigo pelo chat para fechar o ciclo completo."
                : "Comece criando um grupo. Depois disso, voce pode adicionar tasks, conversar com amigos e compartilhar progresso."}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
