"use client";

import AppModal from "@/app/components/UI/AppModal";
import RichTextEditor from "@/app/components/tasks/RichTextEditor";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTaskWorkspaceQuery,
  useUpdateTaskMutation,
} from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function TaskWorkspace({ taskId }: { taskId: string }) {
  const router = useRouter();
  const taskWorkspaceQuery = useTaskWorkspaceQuery(taskId);
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const [titleDraft, setTitleDraft] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string | null>(null);
  const [selectedGroupIdDraft, setSelectedGroupIdDraft] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const task = taskWorkspaceQuery.data?.task ?? null;
  const groups = taskWorkspaceQuery.data?.groups ?? [];
  const isLoading = taskWorkspaceQuery.isLoading;
  const isSaving =
    createTaskMutation.isPending ||
    updateTaskMutation.isPending ||
    deleteTaskMutation.isPending;

  const title = titleDraft ?? task?.title ?? "";
  const notes = notesDraft ?? task?.notes ?? "<p></p>";
  const selectedGroupId = selectedGroupIdDraft ?? task?.group_id ?? "";

  const hasChanges = useMemo(() => {
    if (!task) {
      return false;
    }

    return (
      title.trim() !== task.title ||
      notes !== (task.notes || "<p></p>") ||
      selectedGroupId !== task.group_id
    );
  }, [notes, selectedGroupId, task, title]);

  const handleSave = async () => {
    if (!task) {
      return;
    }

    setFeedback(null);
    try {
      if (selectedGroupId !== task.group_id) {
        await createTaskMutation.mutateAsync({
          group_id: selectedGroupId,
          title: title.trim(),
          notes,
        });
        await deleteTaskMutation.mutateAsync({ id: task.id });
        router.push(`/groups/${selectedGroupId}`);
        router.refresh();
        return;
      }

      await updateTaskMutation.mutateAsync({
        id: task.id,
        title: title.trim(),
        notes,
      });
      await taskWorkspaceQuery.refetch();
      setTitleDraft(null);
      setNotesDraft(null);
      setSelectedGroupIdDraft(null);
      setFeedback("Task salva com sucesso.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel salvar a task.",
      );
    }
  };

  const handleDelete = async () => {
    if (!task) {
      return;
    }

    setFeedback(null);
    try {
      await deleteTaskMutation.mutateAsync({ id: task.id });
      router.push(`/groups/${task.group_id}`);
      router.refresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel apagar a task.",
      );
    }
  };

  if (isLoading) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 px-6 py-20 text-center text-sm text-base-content/45 shadow-sm">
          Carregando task...
        </div>
      </section>
    );
  }

  if (!task) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-[2rem] border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          {feedback ??
            (taskWorkspaceQuery.error instanceof Error
              ? taskWorkspaceQuery.error.message
              : "Task nao encontrada.")}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 px-5 py-6">
      <div className="rounded-[2.2rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div
              className="badge badge-outline border px-3 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{
                color: task.group_color,
                borderColor: task.group_color,
                backgroundColor: `color-mix(in srgb, ${task.group_color} 12%, transparent)`,
              }}
            >
              {task.group_name}
            </div>
            <input
              className="w-full bg-transparent text-4xl font-bold tracking-tight text-base-content outline-none"
              value={title}
              onChange={(event) => setTitleDraft(event.target.value)}
            />
            <p className="text-sm text-base-content/55">
              Edite a nota completa com um editor rico e ajuste as configuracoes da task quando precisar.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              onClick={() => setConfigOpen(true)}
            >
              Configurar task
            </button>
            <button
              type="button"
              className="btn btn-ghost rounded-full text-error"
              onClick={() => setDeleteOpen(true)}
            >
              Apagar task
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              disabled={!hasChanges || isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Salvando..." : "Salvar nota"}
            </button>
          </div>
        </div>
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-base-content/75">
          {feedback}
        </div>
      ) : null}

      <RichTextEditor value={notes} onChange={setNotesDraft} placeholder="Escreva como se estivesse no Word: titulos, listas, destaques e links." />

      <div className="rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
          Resumo rapido
        </p>
        <p className="mt-3 text-sm leading-relaxed text-base-content/55">
          {stripHtml(notes) || "Sua nota ainda esta vazia."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/groups/${task.group_id}`} className="btn btn-ghost rounded-full">
            Voltar para o grupo
          </Link>
          <Link href="/tasks" className="btn btn-ghost rounded-full">
            Buscar outras tasks
          </Link>
        </div>
      </div>

      <AppModal
        open={configOpen}
        title="Configurar task"
        description="Atualize o nome da task e, se quiser, mova para outro grupo. Ao mover, uma nova task e criada no grupo de destino com o mesmo conteudo."
        onClose={() => setConfigOpen(false)}
      >
        <div className="space-y-5">
          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">Nome</span>
            <input
              className="input input-bordered rounded-2xl border-base-300/70"
              value={title}
              onChange={(event) => setTitleDraft(event.target.value)}
            />
          </label>

          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">Grupo</span>
            <select
              className="select select-bordered rounded-2xl border-base-300/70"
              value={selectedGroupId}
              onChange={(event) => setSelectedGroupIdDraft(event.target.value)}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-ghost rounded-full" onClick={() => setConfigOpen(false)}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary rounded-full" onClick={() => void handleSave()} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar configuracoes"}
            </button>
          </div>
        </div>
      </AppModal>

      <AppModal
        open={deleteOpen}
        title="Apagar task"
        description="Essa acao remove a task permanentemente. Confirme apenas se tiver certeza."
        onClose={() => setDeleteOpen(false)}
      >
        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-error/20 bg-error/8 px-4 py-4 text-sm text-error">
            A task &quot;{task.title}&quot; sera apagada e nao podera ser recuperada.
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="btn btn-ghost rounded-full" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-error rounded-full" onClick={() => void handleDelete()} disabled={isSaving}>
              {isSaving ? "Apagando..." : "Confirmar exclusao"}
            </button>
          </div>
        </div>
      </AppModal>
    </section>
  );
}
