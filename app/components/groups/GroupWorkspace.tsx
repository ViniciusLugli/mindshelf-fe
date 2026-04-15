"use client";

import AppModal from "@/app/components/UI/AppModal";
import SearchField from "@/app/components/UI/SearchField";
import TaskCard from "@/app/components/tasks/TaskCard";
import { groupApi, taskApi } from "@/lib/api";
import type { GroupResponse, TaskResponse } from "@/lib/api/types";
import { stripHtml } from "@/lib/utils/text";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function GroupWorkspace({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<GroupResponse | null>(null);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadGroup = useCallback(async () => {
    setIsLoading(true);
    try {
      const [groupResponse, tasksResponse] = await Promise.all([
        groupApi.getById(groupId),
        taskApi.getByGroup(groupId, 1, 50),
      ]);
      setGroup(groupResponse);
      setGroupName(groupResponse.name);
      setTasks(tasksResponse.data);
      setFeedback(null);
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel carregar o grupo.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    void loadGroup();
  }, [loadGroup]);

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return tasks;
    }

    return tasks.filter((task) => {
      const notes = stripHtml(task.notes).toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.group_name.toLowerCase().includes(term) ||
        notes.includes(term)
      );
    });
  }, [search, tasks]);

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskTitle.trim()) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await taskApi.create({ group_id: groupId, title: taskTitle.trim() });
      setTaskTitle("");
      setTaskModalOpen(false);
      await loadGroup();
      setFeedback("Task criada com sucesso.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel criar a task.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!group || !groupName.trim()) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await groupApi.update({ id: group.id, name: groupName.trim() });
      setGroupModalOpen(false);
      await loadGroup();
      setFeedback("Grupo atualizado com sucesso.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel atualizar o grupo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 px-6 py-20 text-center text-sm text-base-content/45 shadow-sm">
          Carregando grupo...
        </div>
      </section>
    );
  }

  if (!group) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-[2rem] border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          {feedback || "Grupo nao encontrado."}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 px-5 py-6">
      <div
        className="overflow-hidden rounded-[2.2rem] border border-base-300/70 bg-base-100/95 shadow-sm"
        style={{
          backgroundImage: `radial-gradient(circle at top left, color-mix(in srgb, ${group.color} 18%, transparent), transparent 32%)`,
        }}
      >
        <div className="px-6 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] text-2xl font-bold text-white shadow-lg"
                style={{ backgroundColor: group.color }}
              >
                {group.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                  Grupo
                </p>
                <h1 className="mt-2 text-4xl font-bold text-base-content">{group.name}</h1>
                <p className="mt-2 text-sm text-base-content/55">
                  Explore as tasks do grupo, crie novas ideias e ajuste a identidade principal do espaco.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-ghost rounded-full"
                onClick={() => setGroupModalOpen(true)}
              >
                Configurar grupo
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-full"
                onClick={() => setTaskModalOpen(true)}
              >
                Criar task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
              Visao geral
            </p>
            <h2 className="mt-2 text-xl font-semibold text-base-content">
              {tasks.length} tasks no grupo
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-base-300/60 bg-base-200/35 p-4 text-sm text-base-content/60">
            A API atual permite editar o nome do grupo. A cor continua exibindo a identidade visual recebida do backend.
          </div>
          <Link href="/groups" className="btn btn-ghost w-full rounded-full justify-start">
            Voltar para grupos
          </Link>
          <Link href="/tasks" className="btn btn-ghost w-full rounded-full justify-start">
            Buscar tasks
          </Link>
        </aside>

        <div className="space-y-5 rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Tasks do grupo
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-base-content">
                Explore e filtre o que esta ativo
              </h2>
            </div>

            <div className="w-full max-w-md">
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Procure por titulo ou conteudo"
              />
            </div>
          </div>

          {feedback ? (
            <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-base-content/75">
              {feedback}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id ?? `${task.group_id}-${task.title}`}
                  id={task.id}
                  title={task.title}
                  notes={stripHtml(task.notes)}
                  groupName={task.group_name}
                  groupColor={task.group_color}
                  href={task.id ? `/tasks/${task.id}` : undefined}
                />
              ))
            ) : (
              <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-16 text-center text-sm text-base-content/45">
                Nenhuma task corresponde a busca.
              </div>
            )}
          </div>
        </div>
      </div>

      <AppModal
        open={taskModalOpen}
        title="Criar task"
        description={`Adicione uma nova task dentro de ${group.name}.`}
        onClose={() => setTaskModalOpen(false)}
      >
        <form className="space-y-5" onSubmit={handleCreateTask}>
          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">Nome da task</span>
            <input
              className="input input-bordered rounded-2xl border-base-300/70"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Ex: Refinar backlog de discovery"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-ghost rounded-full" onClick={() => setTaskModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary rounded-full" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar task"}
            </button>
          </div>
        </form>
      </AppModal>

      <AppModal
        open={groupModalOpen}
        title="Configurar grupo"
        description="Atualize o nome principal do grupo mantendo a identidade atual."
        onClose={() => setGroupModalOpen(false)}
      >
        <form className="space-y-5" onSubmit={handleUpdateGroup}>
          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">Nome do grupo</span>
            <input
              className="input input-bordered rounded-2xl border-base-300/70"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
            />
          </label>

          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">Cor atual</span>
            <div className="flex items-center gap-3 rounded-2xl border border-base-300/60 bg-base-200/35 px-4 py-3 text-sm text-base-content/60">
              <span
                className="h-5 w-5 rounded-full border border-base-100/70"
                style={{ backgroundColor: group.color }}
              />
              {group.color}
            </div>
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-ghost rounded-full" onClick={() => setGroupModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary rounded-full" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar grupo"}
            </button>
          </div>
        </form>
      </AppModal>
    </section>
  );
}
