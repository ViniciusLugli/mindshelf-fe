import AppModal from "@/app/components/UI/AppModal";
import TaskCard from "@/app/(private)/tasks/components/TaskCard";
import type { GroupResponse, MessageResponse } from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";
import Link from "next/link";

type ImportSharedTaskModalProps = {
  open: boolean;
  message: MessageResponse | null;
  groups: GroupResponse[];
  selectedGroupId: string;
  isLoadingGroups: boolean;
  isImporting: boolean;
  errorMessage: string | null;
  onGroupChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ImportSharedTaskModal({
  open,
  message,
  groups,
  selectedGroupId,
  isLoadingGroups,
  isImporting,
  errorMessage,
  onGroupChange,
  onClose,
  onConfirm,
}: ImportSharedTaskModalProps) {
  const sharedTask = message?.shared_task;

  return (
    <AppModal
      open={open}
      title="Importar task compartilhada"
      description="Escolha um dos seus grupos para salvar uma copia dessa task compartilhada." 
      onClose={onClose}
    >
      {sharedTask ? (
        <div className="space-y-5">
          <TaskCard
            title={sharedTask.title || "Task compartilhada"}
            notes={stripHtml(sharedTask.notes)}
            groupName={sharedTask.group_name || "Grupo original"}
            groupColor={sharedTask.group_color || "#E76F51"}
          />

          <label className="form-control gap-2">
            <span className="text-sm font-medium text-base-content/70">
              Salvar no grupo
            </span>
            {isLoadingGroups ? (
              <div className="rounded-3xl border border-dashed border-base-300/70 px-4 py-4 text-sm text-base-content/45">
                Carregando seus grupos...
              </div>
            ) : groups.length ? (
              <select
                className="select select-bordered rounded-2xl border-base-300/70"
                value={selectedGroupId}
                onChange={(event) => onGroupChange(event.target.value)}
                disabled={isImporting}
              >
                <option value="">Selecione um grupo</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-3 rounded-3xl border border-dashed border-base-300/70 px-4 py-4 text-sm text-base-content/55">
                <p>Voce precisa ter pelo menos um grupo para importar essa task.</p>
                <Link href="/groups/new" className="btn btn-primary rounded-full">
                  Criar grupo
                </Link>
              </div>
            )}
          </label>

          {errorMessage ? (
            <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              onClick={onClose}
              disabled={isImporting}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              onClick={onConfirm}
              disabled={isImporting || isLoadingGroups || !groups.length || !selectedGroupId}
            >
              {isImporting ? "Importando..." : "Salvar no meu grupo"}
            </button>
          </div>
        </div>
      ) : null}
    </AppModal>
  );
}
